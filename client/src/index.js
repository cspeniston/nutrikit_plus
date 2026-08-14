import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page';
import './index.css';
import './nutt.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <center>
      <h1>NUTT (Nutrition Utility & Tracking Tool)</h1>
      <h3>NUTT allows you to select your groceries, and track your nutritional progress (good or bad)</h3>
    </center>
    <Page />
  </React.StrictMode>
);