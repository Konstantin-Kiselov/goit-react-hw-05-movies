import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Home
      </NavLink>

      {/* <NavLink
        to="/authors"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Авторы
      </NavLink> */}

      <NavLink
        to="/movies"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Movies
      </NavLink>

      {/* <NavLink
        to="/table"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Таблица
      </NavLink> */}
    </nav>
  );
}
