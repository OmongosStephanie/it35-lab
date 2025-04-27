import React, { useState, useRef, useEffect } from 'react';
import {
  IonContent, IonPage, IonInput, IonButton, IonAlert, IonHeader,
  IonBackButton, IonButtons, IonItem, IonText, IonCol, IonGrid,
  IonRow, IonInputPasswordToggle, IonImg, IonAvatar,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import { useHistory } from 'react-router-dom';

const EditProfile: React.FC = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
        const fetchSessionAndData = async () => {
          // Fetch the current session
          const { data: session, error: sessionError } = await supabase.auth.getSession();
      
          if (sessionError || !session || !session.session) {
            setAlertMessage('You must be logged in to access this page.');
            setShowAlert(true);
            history.push('/it35-lab/login'); // Redirect to login if no session is found
            return;
          }
      
          // Fetch user details from Supabase using the session's email
          const { data: user, error: userError } = await supabase
            .from('users')
            .select('user_firstname, user_lastname, user_avatar_url, user_email, username')
            .eq('user_email', session.session.user.email) // Use email from the session
            .single();
      
          if (userError || !user) {
            setAlertMessage('User data not found.');
            setShowAlert(true);
            return;
          }
      
          // Populate form fields with the retrieved data
          setFirstName(user.user_firstname || '');
          setLastName(user.user_lastname || '');
          setAvatarPreview(user.user_avatar_url);
          setEmail(user.user_email);
          setUsername(user.username || '');
        };
      
        fetchSessionAndData();
      }, [history]);
  
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
      }
    };
  
    const handleUpdate = async () => {
        if (password !== confirmPassword) {
          setAlertMessage("Passwords don't match.");
          setShowAlert(true);
          return;
        }
      
        // Fetch the current session
        const { data: session, error: sessionError } = await supabase.auth.getSession();
      
        if (sessionError || !session || !session.session) {
          setAlertMessage('Error fetching session or no session available.');
          setShowAlert(true);
          return;
        }
      
        const user = session.session.user;
      
        if (!user.email) {
            setAlertMessage('Error: User email is missing.');
            setShowAlert(true);
            return;
          }
          
          const { error: passwordError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: currentPassword,
          });
          
      
        if (passwordError) {
          setAlertMessage('Incorrect current password.');
          setShowAlert(true);
          return;
        }
      
        // Handle avatar upload if the avatar file is changed
        let avatarUrl = avatarPreview;
      
        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;
          
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('user-avatars')
              .upload(filePath, avatarFile, {
                cacheControl: '3600',
                upsert: true,  // Allows overwriting existing files
              });
          
            if (uploadError) {
              setAlertMessage(`Avatar upload failed: ${uploadError.message}`);
              setShowAlert(true);
              return;
            }
          
            // Retrieve the public URL
            const { data } = supabase.storage.from('user-avatars').getPublicUrl(filePath);
            avatarUrl = data.publicUrl;
          }
          
      
        // Update user data in the users table
        const { error: updateError } = await supabase
          .from('users')
          .update({
            user_firstname: firstName,
            user_lastname: lastName,
            user_avatar_url: avatarUrl,
            username: username,
          })
          .eq('user_email', user.email);
      
        if (updateError) {
          setAlertMessage(updateError.message);
          setShowAlert(true);
          return;
        }
      
        // Update the password if a new password is provided
        if (password) {
          const { error: passwordUpdateError } = await supabase.auth.updateUser({
            password: password,
          });
      
          if (passwordUpdateError) {
            setAlertMessage(passwordUpdateError.message);
            setShowAlert(true);
            return;
          }
        }
      
        setAlertMessage('Account updated successfully!');
        setShowAlert(true);
        history.push('/it35-lab/app');
      };
      
  
    return (
      <IonPage>
  <IonHeader>
    <IonButtons slot="start">
      <IonBackButton defaultHref="/it35-lab/app" />
    </IonButtons>
  </IonHeader>

  <IonContent className="ion-padding">
    {/* Centered Container */}
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      background: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Title */}
      <IonText color="primary">
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>
          Edit Profile
        </h1>
      </IonText>

      {/* Avatar Upload */}
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol size="12" className="ion-text-center">
            <IonAvatar style={{
              width: '150px',
              height: '150px',
              margin: '10px auto',
              border: '4px solid #3880ff',
              backgroundColor: '#fff',
              overflow: 'hidden'
            }}>
              <IonImg
                src={avatarPreview || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </IonAvatar>

            <IonButton
              expand="block"
              onClick={() => fileInputRef.current?.click()}
              style={{ marginTop: '10px' }}
              fill="outline"
              color="primary"
              shape="round"
            >
              Change Avatar
            </IonButton>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Form Fields */}
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonInput
              label="Username"
              type="text"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter username"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="6">
            <IonInput
              label="First Name"
              type="text"
              labelPlacement="floating"
              fill="outline"
              placeholder="First Name"
              value={firstName}
              onIonChange={(e) => setFirstName(e.detail.value!)}
            />
          </IonCol>

          <IonCol size="6">
            <IonInput
              label="Last Name"
              type="text"
              labelPlacement="floating"
              fill="outline"
              placeholder="Last Name"
              value={lastName}
              onIonChange={(e) => setLastName(e.detail.value!)}
            />
          </IonCol>
        </IonRow>

        {/* Change Password Section */}
        <IonRow>
          <IonCol size="12">
            <IonText color="primary">
              <h3 style={{ marginTop: '20px', marginBottom: '5px' }}>Change Password</h3>
            </IonText>
            <IonInput
              label="New Password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              placeholder="New Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="12">
            <IonInput
              label="Confirm Password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
          </IonCol>
        </IonRow>

        {/* Confirm Current Password */}
        <IonRow>
          <IonCol size="12">
            <IonText color="primary">
              <h3 style={{ marginTop: '20px', marginBottom: '5px' }}>Confirm Changes</h3>
            </IonText>
            <IonInput
              label="Current Password"
              type="password"
              labelPlacement="floating"
              fill="outline"
              placeholder="Enter Current Password"
              value={currentPassword}
              onIonChange={(e) => setCurrentPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Update Button */}
      <IonButton
        expand="block"
        onClick={handleUpdate}
        shape="round"
        style={{ marginTop: '20px' }}
      >
        Save Changes
      </IonButton>

      {/* Alert */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message={alertMessage}
        buttons={['OK']}
      />
    </div>
  </IonContent>
</IonPage>

    );
  };
  
  export default EditProfile;