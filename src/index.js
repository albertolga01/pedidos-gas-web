import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './component/login'


ReactDOM.render(
  <React.StrictMode>
     <Login isLoggedIn={false}/>
  </React.StrictMode>,
document.getElementById("root")
);

reportWebVitals();
