/* Hier definieren wir die Navigation für unsere Anwendung */
import '../styles/components/Navigation.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li>
          {/*Hier verwenden wir NavLink, damit wir den Link aktiv markieren können,
            wenn die URL übereinstimmt.*/}
          <NavLink
            /*
            to ist die Route, zu der der Link führt*/
            to="/"
            /*
            end sorgt dafür, dass der Link nur aktiv ist, wenn die URL genau übereinstimmt. Damit wird verhindert,
            dass der Link aktiv ist, wenn die URL z.B. "/admin" ist.
            */
            end
            /* isActive ist eine Funktion, die true zurückgibt, wenn der Link aktiv ist*/
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
