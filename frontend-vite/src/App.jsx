// hier befinden sich nur die Routen meiner Seiten und die Navigation
// die Seiten selbst sind in den pages Ordnern

import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Shop from './pages/Shop';
import Admin      from './pages/Admin';
import Contact    from './pages/Contact';

export default function App() {
  return (
    <>
      <Navigation />

      <main className="main-content">
        <Routes>
          <Route path="/"        element={<Shop />} />
          <Route path="/admin"   element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}