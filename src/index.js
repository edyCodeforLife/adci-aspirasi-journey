import React from 'react';
import ReactDOM from 'react-dom';
import StoreProvider from "./store/context";
import App from './App';
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import LanguageContextProvider from './utils/i18n/LanguageContext';

if (process.env.REACT_APP_ENV === "production"){
  Sentry.init({ dsn: "https://a63ef03c5cbe4f358e37dc009e090921@sentry.io/1782612" });
}

ReactDOM.render(
  <LanguageContextProvider>
  <StoreProvider>
      <App />
  </StoreProvider>
  </LanguageContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
