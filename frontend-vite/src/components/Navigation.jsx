import '../styles/components/Navigation.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            Produkt verwalten
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            Kontakt
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
