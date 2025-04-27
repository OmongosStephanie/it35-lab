import { 
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, 
  IonHeader, 
  IonIcon,
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import { heartOutline } from 'ionicons/icons'; // <-- make sure naka-import ito

const Favorite: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favorite</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Flex container */}
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',  // Allow wrapping if screen is small
        }}>
          {/* Card 1 */}
          <IonCard style={{ width: '250px' }}>
            <img 
              alt="Shikimori's Not Just a Cutie"
              src="https://imgs.search.brave.com/vkxvb8mviozR1jOAflUfiZx9NHiA5emQdEmslXkhcdQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qll6TTBNR1Js/TXpFdE1XSXdOaTAw/WmpBekxXSXpPREl0/TURObE5tTTBNR1U0/TVRZNVhrRXlYa0Zx/Y0djQC5qcGc"
            />
            <IonCardHeader>
              <IonCardTitle>Shikimori's Not Just a Cutie</IonCardTitle>
              <IonCardSubtitle>Japanese Anime</IonCardSubtitle>
            </IonCardHeader>
            {/* Heart icon (left side) */}
            <IonCardContent style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <IonIcon icon={heartOutline} size="large" color="danger" />
            </IonCardContent>
          </IonCard>

          {/* Card 2 */}
          <IonCard style={{ width: '250px' }}>
            <img 
              alt="Hori-san to Miyamura-kun"
              src="https://imgs.search.brave.com/RKMgJkmccVoMmjQqF0jg8hyK8gWM9uvGV0duk7hn5rc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9HVXpZbVpr/WmpJdE5qSTVZaTAw/TmpsbExUaGlNalV0/WVRZME1ESTRNMlkw/TW1abFhrRXlYa0Zx/Y0djQC5qcGc"
            />
            <IonCardHeader>
              <IonCardTitle>Hori-san to Miyamura-kun</IonCardTitle>
              <IonCardSubtitle>Japanese Anime</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <IonIcon icon={heartOutline} size="large" color="danger" />
            </IonCardContent>
          </IonCard>

          {/* Card 3 */}
          <IonCard style={{ width: '250px' }}>
            <img 
              alt="My Neighbor Totoro"
              src="https://imgs.search.brave.com/cjKeAquo31xn8ERfmwCyEKiTcXlGeVJ45D7z81nTZ2k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QllXTTNNREUz/WWpFdE16SXpaQzAw/T0RFNUxUZ3hOVEl0/Tm1VeU1UQmtNMk0y/Tm1OaVhrRXlYa0Zx/Y0djQC5qcGc"
            />
            <IonCardHeader>
              <IonCardTitle>My Neighbor Totoro</IonCardTitle>
              <IonCardSubtitle>Japanese Anime</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <IonIcon icon={heartOutline} size="large" color="danger" />
            </IonCardContent>
          </IonCard>

          {/* Card 4 */}
          <IonCard style={{ width: '250px' }}>
            <img 
              alt="FairyTail"
              src="https://imgs.search.brave.com/XH9mP2YNOHu7vVe8WnQZBmhy6vruY8XNIwfwHQRhnrc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9EVTRaak0y/TW1ZdE1HUTRaQzAw/TmpNMUxXSmlNMlV0/WW1aaE56SXdOMlJr/WXpReVhrRXlYa0Zx/Y0djQC5qcGc"
            />
            <IonCardHeader>
              <IonCardTitle>FairyTail</IonCardTitle>
              <IonCardSubtitle>Japanese Anime</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <IonIcon icon={heartOutline} size="large" color="danger" />
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorite;
