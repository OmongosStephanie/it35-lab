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

const mockUsers = [
  { username: 'john.doe@example.com', password: '12345' } // Example user for testing
];

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'danger' | 'success'>('success');

  const doLogin = () => {
    // Simulating API request
    setTimeout(() => {
      // Check if user exists in mockUsers
      const user = mockUsers.find(u => u.username === email && u.password === password);
      
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
            label="Email" 
            placeholder="Enter Email" 
            value={email}
            onIonInput={e => setEmail(e.detail.value!)} 
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
        message="Incorrect email or password."
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
