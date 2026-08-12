import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page';
import './index.css';
import './nutrikit.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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