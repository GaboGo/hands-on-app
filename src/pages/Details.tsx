import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar, 
    IonCard, 
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonLabel,
    IonBadge
  } from '@ionic/react';
  import React from 'react';
  import { useSelector } from 'react-redux'
  import { RouteComponentProps, withRouter } from 'react-router';

  type DetailParams = {
    userName: string; // parameters will always be a string (even if they are numerical)
  };

  type DetailProps = RouteComponentProps<DetailParams>;

  const Details: React.FC<DetailProps> = ({match}) => {

    const state = useSelector((state: any) => state);
    const { items } = state.reducer;
    let user = items.find((user: any) => user.login.username == match.params.userName);
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{user.name.first} {user.name.last}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonImg src={user.picture.large} />
            <IonCardHeader>
              <IonCardSubtitle>{user.location.city}, {user.location.country}</IonCardSubtitle>
              <IonCardTitle>{user.login.username}</IonCardTitle>
            </IonCardHeader>
             
            <IonCardContent>
              <IonCardSubtitle>Age: {user.dob.age}</IonCardSubtitle>
              <IonCardSubtitle>Gender: {user.gender}</IonCardSubtitle>
              <IonCardSubtitle>Phone: {user.phone}</IonCardSubtitle>
              <IonCardSubtitle>Cell: {user.cell}</IonCardSubtitle>
           </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  export default withRouter(Details);