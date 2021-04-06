import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session';
import { logout } from './actions/sessionActions';
import reportWebVitals from './reportWebVitals';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser }};
    const currentTime = Date.now() / 1000; 

    setAuthToken(localStorage.jwtToken);
    store = configureStore(preloadedState);


    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }

  ReactDOM.render(
    <React.StrictMode>
      <Root store={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );

});




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
