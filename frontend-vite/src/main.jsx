/*
hier importieren wir die notwendigen React-Bibliotheken und Komponenten,
die wir für unsere Anwendung benötigen. ReactDOM wird verwendet, um unsere React-Komponenten
in den DOM zu rendern. BrowserRouter ermöglicht das Routing in unserer Anwendung.
HelmetProvider wird verwendet, um den HTML-Kopf (Titel, Meta-Tags usw.) auf jeder Seite individuell zu setzen.
*/
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import './styles/DevicesLarge.css';
import './styles/DevicesSmall.css';

/*
Hier wird die React-Anwendung gerendert und in das HTML-Element mit der ID 'root' eingefügt.
Das ist der Einstiegspunkt für unsere Anwendung. Das bedeutet, dass alles, was wir in der App-Komponente definieren,
in diesem Element angezeigt wird.
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);