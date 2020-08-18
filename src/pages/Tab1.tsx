import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { IonContent, 
         IonHeader, 
         IonPage, 
         IonTitle, 
         IonToolbar, 
         IonList, 
         IonItem,
         IonAvatar,
         IonLabel,
         IonInfiniteScroll, 
         IonInfiniteScrollContent
       } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { setCurrentPage } from '../actions/actions';

const Tab1: React.FC = () => {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch()
  const { items, currentItems, isFetching, currentPage } = state.reducer;
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

  
  function loadNextPage($event: CustomEvent<void>) {
    const cardsPerPage = 10
    let indexOfLastCard = currentPage * cardsPerPage
    let indexOfFirstCard = indexOfLastCard - cardsPerPage
    let currentCards = items.length > 0 && items.slice(indexOfFirstCard, indexOfLastCard);
    if(items.length > currentItems.length){
      dispatch(setCurrentPage(currentPage + 1, currentCards));
    }
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }
  
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
          {currentItems.map((item: any) => (
          <Link className="links" key={item.login.username} to={`/details/${item.login.username}`}>
            <IonItem>
                <IonAvatar slot="start">
                  <img src={item.picture.thumbnail} />
                </IonAvatar>
                <IonLabel>{item.name.first} {item.name.last}</IonLabel>
            </IonItem>
          </Link>
          ))}
          <IonInfiniteScroll threshold="15%"
            disabled={disableInfiniteScroll}
            onIonInfinite={(e: CustomEvent<void>) => loadNextPage(e)}>
            <IonInfiniteScrollContent
                loadingText="Loading more">
            </IonInfiniteScrollContent>
        </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1
