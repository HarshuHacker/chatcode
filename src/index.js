import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './components/App';
import { configureStore } from './store';

const store = configureStore()
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("Store", store.getState())
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);