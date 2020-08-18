import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { IonContent, 
         IonHeader, 
         IonPage, 
         IonTitle, 
         IonToolbar, 
         IonList, 
         IonItem,
         IonAvatar,
         IonLabel 
       } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const state = useSelector((state: any) => state);
  const { items, isFetching, currentPage } = state.reducer;
  
  useEffect(() => {
    console.log(items, isFetching, currentPage);
   },[items, isFetching, currentPage]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Users</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isFetching &&
        <ExploreContainer name="Loading.. " />
        }
        <IonList>
          {items.map((item: any) => (
          <Link key={item.login.username} to={`/details/${item.login.username}`}>
            <IonItem>
                <IonAvatar slot="start">
                  <img src={item.picture.thumbnail} />
                </IonAvatar>
                <IonLabel>{item.name.first} {item.name.last}</IonLabel>
            </IonItem>
          </Link>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1
