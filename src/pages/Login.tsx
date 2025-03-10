import React, { useState } from 'react';
import { 
  IonAvatar,
  IonButton,
  IonCol,
  IonContent, 
  IonGrid, 
  IonHeader, 
  IonInput, 
  IonInputPasswordToggle, 
  IonPage, 
  IonRow, 
  IonTitle, 
  IonToolbar, 
  useIonRouter,
  IonText,
  IonAlert,
  IonToast
} from '@ionic/react';

// Mock user data for testing purposes
const mockUsers = [
  { username: '', password: '' } // valid mock user
];

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'danger' | 'success'>('success');

  const doLogin = () => {
    // Simulating API request
    setTimeout(() => {
      try {
        // Simulating API error (uncomment the next line to test the error scenario)
        // throw new Error("API Error: Unable to process request");

        // Check if user exists in mockUsers
        const user = mockUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
          // Login success
          setToastMessage('Login successful!');
          setToastColor('success');
          setShowToast(true);
          navigation.push('/it35-lab/app', 'forward', 'replace');
        } else {
          // Invalid credentials
          setShowAlert(true);
        }
      } catch (error) {
        // API Error
        setToastMessage('API Error: Please try again later.');
        setToastColor('danger');
        setShowToast(true);
      }
    }, 1000);
  };

  const goToRegister = () => {
    navigation.push('/it35-lab/register');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <div style={{ marginTop: '25%' }}>
          <IonGrid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <IonRow>
              <IonCol size="8">
                <IonAvatar style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    style={{ width: '100px', objectFit: 'cover' }}
                    alt="Silhouette of a person's head"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IuuDjoVX1X4nogT6N9ZqKE9uoTYkU8eSzQ&s"
                  />
                </IonAvatar>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonInput 
            label="Username" 
            placeholder="Enter Username" 
            value={username}
            onIonInput={e => setUsername(e.detail.value!)} 
          />
          <IonInput 
            type="password" 
            label="Password"
            value={password}
            onIonInput={e => setPassword(e.detail.value!)} 
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
          <IonButton onClick={doLogin} expand="full">
            Login
          </IonButton>

          <IonText color="primary" style={{ display: 'block', marginTop: '15px', textAlign: 'center' }}>
            Don't have an account?{' '}
            <span onClick={goToRegister} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Sign up
            </span>
          </IonText>
        </div>
      </IonContent>

      {/* Alert for invalid credentials */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Login Failed"
        message="Incorrect username or password."
        buttons={['OK']}
      />

      {/* Toast for success */}
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        color={toastColor}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default Login;
