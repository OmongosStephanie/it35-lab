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
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState({ message: '', show: false });

  const doLogin = () => {
      const registeredEmail = localStorage.getItem('registeredEmail');
      const registeredPassword = localStorage.getItem('registeredPassword');

      if (email === registeredEmail && password === registeredPassword) {
          setShowToast({ message: 'Login Successful!', show: true });
          setTimeout(() => {
              navigation.push('/it35-lab/app', 'forward', 'replace');
          }, 1000);
      } else {
          setShowAlert(true);
      }
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
                                      src="https://www.pinterest.com/ideas/kuromi-anime/902307646428/hthttps://www.pinterest.com/ideas/kuromi-anime/902307646428/tps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IuuDjoVX1X4nogT6N9ZqKE9uoTYkU8eSzQ&s"
                                  />
                              </IonAvatar>
                          </IonCol>
                      </IonRow>
                  </IonGrid>
                  <IonInput label="Email" placeholder="Enter email" onIonInput={(e) => setEmail(e.detail.value!)} />
                  <IonInput type="password" label="Password" onIonInput={(e) => setPassword(e.detail.value!)}>
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

                  <IonAlert
                      isOpen={showAlert}
                      onDidDismiss={() => setShowAlert(false)}
                      header="Login Failed"
                      message="Incorrect Email or Password!"
                      buttons={['OK']}
                  />

                  <IonToast
                      isOpen={showToast.show}
                      onDidDismiss={() => setShowToast({ ...showToast, show: false })}
                      message={showToast.message}
                      duration={2000}
                  />
              </div>
          </IonContent>
      </IonPage>
  );
};

export default Login;
