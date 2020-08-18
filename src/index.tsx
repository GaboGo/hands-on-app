import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import store from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.getElementById('root'));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
