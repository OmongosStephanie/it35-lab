import { useState, useEffect } from 'react';
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
  IonInput, IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonText, IonAvatar, IonCol,
  IonGrid, IonRow, IonIcon, IonPopover, IonTextarea
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, ellipsisVertical, heart, heartOutline, chatbubblesOutline, shareSocial } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState<{ [key: string]: { username: string; comment_text: string; comment_created_at: string }[] }>({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };

    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (!error) setPosts(data as Post[]);
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('comment_created_at', { ascending: true });

      if (!error && data) {
        const groupedComments = data.reduce((acc: any, comment: any) => {
          if (!acc[comment.post_id]) acc[comment.post_id] = [];
          acc[comment.post_id].push(comment);
          return acc;
        }, {});
        setComments(groupedComments);
      }
    };

    fetchUser();
    fetchPosts();
    fetchComments();
  }, []);

  const createPost = async () => {
    if (!postContent.trim() || !user || !username) return;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user avatar:', userError);
      return;
    }

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data, error } = await supabase
      .from('posts')
      .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
    }

    setPostContent('');
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent.trim() || !editingPost) return;

    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  const handleReact = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!commentText.trim() || !user || !username) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: postId,
        user_id: user.id,
        username,
        comment_text: commentText,
      }])
      .select('*');

    if (!error && data) {
      const newComment = data[0];
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));
      setCommentText('');
      setCommentingPostId(null);
    } else {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <IonContent className="ion-padding" style={{ background: '#e9ebee', minHeight: '100vh' }}>
      {user ? (
        <>
          {/* Create Post Section */}
          <IonCard style={{
            marginTop: '1rem',
            borderRadius: '10px',
            backgroundColor: '#fff',
            padding: '1rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <IonRow className="ion-align-items-center">
              <IonCol size="auto">
                <IonAvatar>
                  <img src={user?.user_metadata?.avatar_url || 'https://i.pinimg.com/736x/eb/17/8a/eb178a2210506f2c6b990a39b34f3c5c.jpg'} alt="Your Avatar" />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <IonTextarea
                  value={postContent}
                  onIonInput={e => setPostContent(e.detail.value!)}
                  placeholder="What's on your mind?"
                  autoGrow
                  style={{ border: 'none', fontSize: '16px', backgroundColor: '#f0f2f5', borderRadius: '20px', padding: '10px' }}
                />
              </IonCol>
            </IonRow>
            <IonButton expand="block" onClick={createPost} style={{
              marginTop: '10px',
              borderRadius: '20px',
              fontWeight: 'bold'
            }}>
              Post
            </IonButton>
          </IonCard>

          {/* Feed Section */}
          {posts.map(post => (
            <IonCard key={post.post_id} style={{
              marginTop: '1rem',
              borderRadius: '10px',
              backgroundColor: '#fff',
              padding: '0.5rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <IonCardHeader style={{ paddingBottom: '0' }}>
                <IonRow className="ion-align-items-center">
                  <IonCol size="auto">
                    <IonAvatar>
                      <img src={post.avatar_url} alt="avatar" />
                    </IonAvatar>
                  </IonCol>
                  <IonCol>
                    <IonCardTitle style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                      {post.username}
                    </IonCardTitle>
                    <IonCardSubtitle style={{ fontSize: '12px', color: '#65676b' }}>
                      {new Date(post.post_created_at).toLocaleString()}
                    </IonCardSubtitle>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton fill="clear" size="small"
                      onClick={(e) => setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })}
                    >
                      <IonIcon icon={ellipsisVertical} color="medium" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardHeader>

              <IonCardContent style={{ fontSize: '15px', color: '#050505' }}>
                {post.post_content}
              </IonCardContent>

              {/* React, Comment, and Share Buttons */}
              <IonGrid style={{ padding: '0 1rem 1rem 1rem' }}>
                <IonRow>
                  {/* React (Like) Button */}
                  <IonCol>
                    <IonButton
                      expand="block"
                      fill="clear"
                      size="small"
                      style={{
                        borderRadius: '20px',
                        color: likedPosts[post.post_id] ? 'red' : 'inherit',
                      }}
                      onClick={() => handleReact(post.post_id)}
                    >
                      <IonIcon icon={likedPosts[post.post_id] ? heart : heartOutline} slot="start" />
                    </IonButton>
                  </IonCol>

                  {/* Comment Button */}
                  <IonCol>
                    <IonButton
                      expand="block"
                      fill="clear"
                      size="small"
                      style={{
                        borderRadius: '20px',
                        color: 'inherit',
                      }}
                      onClick={() => setCommentingPostId(post.post_id)}
                    >
                      <IonIcon icon={chatbubblesOutline} slot="start" />
                    </IonButton>
                  </IonCol>

                  {/* Share Button */}
                  <IonCol>
                    <IonButton
                      expand="block"
                      fill="clear"
                      size="small"
                      style={{
                        borderRadius: '20px',
                        color: 'inherit',
                      }}
                      onClick={() => alert('Post shared!')}
                    >
                      <IonIcon icon={shareSocial} slot="start" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>

              {/* Comment Section */}
              {commentingPostId === post.post_id && (
                <IonRow style={{ marginBottom: '1rem' }}>
                  <IonCol>
                    <IonTextarea
                      value={commentText}
                      onIonInput={e => setCommentText(e.detail.value!)}
                      placeholder="Add a comment..."
                      autoGrow
                      style={{
                        border: 'none',
                        fontSize: '14px',
                        backgroundColor: '#f0f2f5',
                        borderRadius: '20px',
                        padding: '10px',
                      }}
                    />
                    <IonButton
                      expand="block"
                      onClick={() => handleCommentSubmit(post.post_id)}
                      style={{
                        marginTop: '10px',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      Comment
                    </IonButton>
                  </IonCol>
                </IonRow>
              )}

              {/* Display Comments */}
              {comments[post.post_id]?.map(comment => (
                <IonCard key={comment.comment_created_at}>
                  <IonCardHeader style={{ paddingBottom: '0' }}>
                    <IonRow>
                      <IonCol size="auto">
                        <IonAvatar>
                          <img src="https://i.pinimg.com/736x/eb/17/8a/eb178a2210506f2c6b990a39b34f3c5c.jpg" alt="avatar" />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonCardTitle style={{ margin: 0 }}>{comment.username}</IonCardTitle>
                        <IonCardSubtitle style={{ fontSize: '12px' }}>
                          {new Date(comment.comment_created_at).toLocaleString()}
                        </IonCardSubtitle>
                      </IonCol>
                    </IonRow>
                  </IonCardHeader>
                  <IonCardContent>{comment.comment_text}</IonCardContent>
                </IonCard>
              ))}
            </IonCard>
          ))}

          {/* Modal for Editing Post */}
          <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit Post</IonTitle>
                <IonButton slot="end" fill="clear" onClick={() => setIsModalOpen(false)}>
                  Close
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonTextarea
                value={postContent}
                onIonInput={e => setPostContent(e.detail.value!)}
                autoGrow
                style={{ margin: '10px', borderRadius: '20px', padding: '10px' }}
              />
              <IonButton expand="block" onClick={savePost} style={{ marginTop: '10px' }}>
                Save Changes
              </IonButton>
            </IonContent>
          </IonModal>
        </>
      ) : (
        <IonText>Loading...</IonText>
      )}

      {/* Popover for Edit and Delete */}
      <IonPopover
        isOpen={popoverState.open}
        event={popoverState.event}
        onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
      >
        <IonContent>
          <IonButton
            onClick={() => startEditingPost(posts.find(post => post.post_id === popoverState.postId)!)}

            style={{
              width: '50%',
              borderRadius: '20px',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px',
            }}
          >
            <IonIcon icon={pencil} slot="start" style={{ marginRight: '5px' }} />
            Edit
          </IonButton>
          <IonButton
            color="danger"
            onClick={() => deletePost(popoverState.postId!)}
            style={{
              width: '50%',
              borderRadius: '20px',
              color: 'danger',
              fontWeight: 'bold',
              padding: '10px',
            }}
          >
            <IonIcon icon={trash} slot="start" style={{ marginRight: '5px' }} />
            Delete
          </IonButton>
        </IonContent>
      </IonPopover>
    </IonContent>
  );
};

export default FeedContainer;
