import Shiva from '../assets/Shiva.jpg';
import '../styles/pages/Contact.css';

export default function Contact() {
  return (
    <div className="contact">
      <h1>Kontakt</h1>
      <p>
        Schreib uns eine E-Mail an hoeb@shop.com oder ruf uns an unter 079 (het sie gseit).
      </p>
      <img src={Shiva} alt="Mike Shiva grüsst" />
    </div>
  );
}
