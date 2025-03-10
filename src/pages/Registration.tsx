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
    IonText
  } from '@ionic/react';
  
  const Registration: React.FC = () => {
    const navigation = useIonRouter();
  
    // Mock registration logic
    const doRegister = () => {
      console.log('User registered!');
      navigation.push('/it35-lab', 'forward', 'replace'); // Redirect to login page after registration
    };
  
    const goToLogin = () => {
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
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IuuDjoVX1X4nogT6N9ZqKE9uoTYkU8eSzQ&s"
                    />
                  </IonAvatar>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonInput label="Username" placeholder="Enter username" />
            <IonInput type="email" label="Email" placeholder="Enter email" />
            <IonInput type="password" label="Password">
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
            <IonInput type="password" label="Confirm Password">
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
            <IonButton onClick={doRegister} expand="full">
              Sign Up
            </IonButton>
  
            <IonText color="primary" style={{ display: 'block', marginTop: '15px', textAlign: 'center' }}>
              Already have an account?{' '}
              <span onClick={goToLogin} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                Log in
              </span>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Registration;