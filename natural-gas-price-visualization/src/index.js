/**
 * Pick Your Own Data index.js JavaScript Code
 * @author Frank Luo
 * Sources Used:
 * https://react.dev/learn 
 * https://kinsta.com/knowledgebase/what-is-react-js/
 * https://www.youtube.com/watch?v=b9eMGE7QtTk
 **/

// Importing relevant components 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles.css'; 

// Creating a root element using ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Calling reportWebVitals to collect performance measurements
reportWebVitals();
