// load React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import the frontend react app created under ./App.js
import App from './App';
import * as serviceWorker from './serviceWorker'; // not used in this tutorial

// tell React to render our app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // and put the rendered app in the html under the indicated element id
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
