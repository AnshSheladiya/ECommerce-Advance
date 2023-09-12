// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import i18n from '../src/helpers/i18n'; // Import the i18n configuration file

import { Provider } from 'react-redux'; 
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App with Provider and pass the store */}
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();


