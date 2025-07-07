/* hier wird die Navigationliste definiert */

import '../styles/components/Navigation.css';
import { Link } from 'react-router-dom';
export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li>
          <Link to="/admin">Produkt verwalten</Link>
        </li>
        <li>
          <Link to="/contact">Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
}