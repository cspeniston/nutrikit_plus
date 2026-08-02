import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './nutrikit.css';
import Page from './Page';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <center>
      <h1>NutriKit Food Planner</h1>
      <h3>NutriKit allows you to select your groceries, and track your nutritional progress (good or bad)</h3>
    </center>

    <Page />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();