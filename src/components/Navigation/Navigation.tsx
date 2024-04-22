import { Link, NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import logo from '../../assets/car-logo.png';

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <div>
        <Link to="/" className={s.logo_wrapper}>
          <img src={logo} className={s.logo} alt="logo" />
          <p>Car Rental</p>
        </Link>
      </div>
      <div className={s.nav_wrapper}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
