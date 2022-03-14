import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import firebase from './fbase';
import "./styles.css";
import { HashRouter } from 'react-router-dom';

// console.log(fbase);

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ HashRouter>,
  document.getElementById('root')
);

reportWebVitals();
