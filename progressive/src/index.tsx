import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <script src="https://unpkg.com/react/umd/react.production.min.js"></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"></script>

    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
