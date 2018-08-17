import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let preloadedState;
  if(window.currentUser){
    preloadedState={
      entities:{users:{[`${currentUser.id}`]:currentUser}},
      session:{currentUser:currentUser.id}
    };
  }
  const store = configureStore(preloadedState);
  ReactDOM.render(<Root store={store}/>, root);
});
