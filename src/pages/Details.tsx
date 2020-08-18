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
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton
  } from '@ionic/react';
  import { camera, trash, close } from 'ionicons/icons';
  import { usePhotoGallery } from '../hooks/usePhotoGallery';
  import React, { useEffect } from 'react';
  import { useSelector, useDispatch } from 'react-redux'
  import { RouteComponentProps, withRouter } from 'react-router';
  import { updateData } from '../actions/actions';

  type DetailParams = {
    userName: string; // parameters will always be a string (even if they are numerical)
  };

  type DetailProps = RouteComponentProps<DetailParams>;

  const Details: React.FC<DetailProps> = ({match}) => {
    const { photos, takePhoto } = usePhotoGallery();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const { currentItems } = state.reducer;
    let user = currentItems.find((user: any) => user.login.username == match.params.userName);

    useEffect(() => {
       if(photos.length > 0){
        let photoIndex = photos.findIndex(p => p.filepath === user.login.username+".jpeg");
        if(photoIndex >= 0){
          dispatch(updateData(user, photos[photoIndex].webviewPath))
        }
       }
    },[photos.length])
  
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
          <IonFab vertical="center" horizontal="end" slot="fixed">
              <IonFabButton onClick={() => takePhoto(user.login.username)}>
                <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
  export default withRouter(Details);