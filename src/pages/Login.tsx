import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

// Import the Google Font in your main index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent 
        className="ion-padding" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          backdropFilter: 'blur(4px)',
          fontFamily: `'Poppins', sans-serif` // ✅ Apply the font here
        }}
      >
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', 
          padding: '30px', 
          borderRadius: '20px',
          maxWidth: '400px',
          margin: 'auto',
          marginTop: '15%',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <IonAvatar style={{
              width: '120px',
              height: '120px',
              marginBottom: '10px',
              border: '4px solid #6200ea',
            }}>
              <img 
                src="https://i.pinimg.com/736x/d1/2f/dc/d12fdc235cf8cc65639b077a454a0313.jpg" 
                alt="User Avatar" 
                style={{ width: '100%', height: '100%' }} 
              />
            </IonAvatar>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#6200ea',
              marginBottom: '5px'
            }}>LOGIN</h1>
            <p style={{ fontSize: '14px', color: '#555' }}>
              Welcome back! Please login to your account.
            </p>
          </div>

          <IonInput
            label="Email" 
            labelPlacement="floating" 
            fill="outline"
            shape='round'
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            style={{ marginBottom: '15px', '--highlight-color-focused': '#3880ff' }}
          />
          <IonInput 
            label="Password"    
            labelPlacement="floating"
            fill="outline"
            shape='round'
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            style={{ marginBottom: '25px', '--highlight-color-focused': '#3880ff' }}
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>

          <IonButton 
            onClick={doLogin} 
            expand="block" 
            shape="round" 
            color="warning" 
            style={{ marginBottom: '15px' }}
          >
            Login
          </IonButton>

          <IonButton 
            routerLink="/it35-lab/register" 
            expand="block" 
            fill="clear" 
            color="primary" 
            shape="round"
          >
            Don't have an account? Register here
          </IonButton>
        </div>

        {/* AlertBox */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
