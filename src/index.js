import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import "./assets/css/index.css";
import App from "./components/App";
import { configureStore } from "./store";

const store = configureStore();

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <React.StrictMode>
       <App />
     </React.StrictMode>
   </Provider>
  </React.StrictMode>
);