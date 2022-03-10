import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import firebase from './fbase';
import "./styles.css";
import { BrowserRouter } from 'react-router-dom';

// console.log(fbase);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
