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
  IonModal
} from '@ionic/react';
import { useState } from 'react';

const Registration: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const doRegister = () => {
      if (!email.endsWith('@nbsc.edu.ph')) {
          alert('Email must be a valid @nbsc.edu.ph address.');
          return;
      }

      if (password !== confirmPassword) {
          setShowAlert(true);
          return;
      }

      setShowModal(true);
  };

  const confirmRegistration = () => {
      // Save registration data to local storage
      localStorage.setItem('registeredEmail', email);
      localStorage.setItem('registeredPassword', password);

      setShowModal(false);
      alert('Registration successful! Redirecting to login...');

      // 🟢 Clear input fields before redirecting
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // 🔹 Redirect to login page after registration
      navigation.push('/it35-lab');
  };

  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Sign Up</IonTitle>
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
                                      src="https://enhttps://www.pinterest.com/ideas/kuromi-anime/902307646428/crypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IuuDjoVX1X4nogT6N9ZqKE9uoTYkU8eSzQ&s"
                                  />
                              </IonAvatar>
                          </IonCol>
                      </IonRow>
                  </IonGrid>
                  <IonInput
                      label="Email"
                      placeholder="Enter email"
                      type="email"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value!)}
                  />
                  <IonInput
                      type="password"
                      label="Password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                  >
                      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>
                  <IonInput
                      type="password"
                      label="Confirm Password"
                      value={confirmPassword}
                      onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                  >
                      <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>
                  <IonButton onClick={doRegister} expand="full">
                      Sign Up
                  </IonButton>

                  <IonText color="primary" style={{ display: 'block', marginTop: '15px', textAlign: 'center' }}>
                      Already have an account?{' '}
                      <span onClick={() => navigation.push('/it35-lab')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                          Log in
                      </span>
                  </IonText>

                  <IonAlert
                      isOpen={showAlert}
                      onDidDismiss={() => setShowAlert(false)}
                      header="Error"
                      message="Passwords do not match!"
                      buttons={['OK']}
                  />

                  <IonModal isOpen={showModal}>
                      <IonContent className="ion-padding">
                          <h2>Confirm Details</h2>
                          <p>Email: {email}</p>
                          <p>Password: {password.replace(/./g, '*')}</p>
                          <IonButton expand="full" onClick={confirmRegistration}>Confirm</IonButton>
                          <IonButton expand="full" color="danger" onClick={() => setShowModal(false)}>Cancel</IonButton>
                      </IonContent>
                  </IonModal>
              </div>
          </IonContent>
      </IonPage>
  );
};

export default Registration;
