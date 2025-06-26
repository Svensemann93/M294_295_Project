import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; //macht, dass der Titel (HTML-Kopf) auf jeder Seite individuell
// gesetzt werden kann
 
import App from './App';
import './styles/DevicesLarge.css';
import './styles/DevicesSmall.css';
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);