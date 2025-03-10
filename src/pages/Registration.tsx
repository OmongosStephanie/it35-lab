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
  IonModal,
  IonLabel
} from '@ionic/react';

const Registration: React.FC = () => {
  const navigation = useIonRouter();
  
  // State variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPasswordMismatchAlert, setShowPasswordMismatchAlert] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);

  const handleRegister = () => {
    // Passwords don't match
    if (password !== confirmPassword) {
      setShowPasswordMismatchAlert(true);
      return;
    }

    // Email validation (should be @nbsc.edu.ph)
    if (!email.endsWith('@nbsc.edu.ph')) {
      setShowEmailAlert(true);
      return;
    }

    // Show confirmation modal
    setShowModal(true);
  };

  const confirmRegistration = () => {
    // Store the user in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Close the modal and show success modal
    setShowModal(false);
    setShowSuccessModal(true);

    // Redirect to login page after success
    setTimeout(() => {
      navigation.push('/it35-lab', 'forward', 'replace');
    }, 2000); // 2-second delay before redirect
  };

  const cancelRegistration = () => {
    // Close modal without registration
    setShowModal(false);
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IuuDjoVX1X4nogT6N9ZqKE9uoTYkU8eSzQ&s"
                  />
                </IonAvatar>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonInput 
            label="Username" 
            placeholder="Enter username" 
            value={username}
            onIonInput={e => setUsername(e.detail.value!)} 
          />
          <IonInput 
            type="email" 
            label="Email" 
            placeholder="Enter email" 
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
          <IonInput 
            type="password" 
            label="Confirm Password"
            value={confirmPassword}
            onIonInput={e => setConfirmPassword(e.detail.value!)} 
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
          <IonButton onClick={handleRegister} expand="full">
            Sign Up
          </IonButton>

          <IonText color="primary" style={{ display: 'block', marginTop: '15px', textAlign: 'center' }}>
            Already have an account?{' '}
            <span onClick={() => navigation.push('/it35-lab')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Log in
            </span>
          </IonText>
        </div>
      </IonContent>

      {/* Alert for password mismatch */}
      <IonAlert
        isOpen={showPasswordMismatchAlert}
        onDidDismiss={() => setShowPasswordMismatchAlert(false)}
        header="Password Mismatch"
        message="The passwords you entered do not match."
        buttons={['OK']}
      />

      {/* Alert for invalid email */}
      <IonAlert
        isOpen={showEmailAlert}
        onDidDismiss={() => setShowEmailAlert(false)}
        header="Invalid Email"
        message="Please enter a valid email with the domain @nbsc.edu.ph."
        buttons={['OK']}
      />

      {/* Confirmation Modal */}
      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confirm Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonLabel><b>Username:</b> {username}</IonLabel><br />
            <IonLabel><b>Email:</b> {email}</IonLabel><br />
            <IonButton expand="full" onClick={confirmRegistration} style={{ marginTop: '15px' }}>
              Confirm Registration
            </IonButton>
            <IonButton expand="full" onClick={cancelRegistration} style={{ marginTop: '10px' }}>
              Cancel
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      {/* Registration Success Modal */}
      <IonModal isOpen={showSuccessModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Registration Successful</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonLabel>Your registration was successful!</IonLabel><br />
            <IonButton expand="full" onClick={() => setShowSuccessModal(false)} style={{ marginTop: '15px' }}>
              Go to Login
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Registration;
