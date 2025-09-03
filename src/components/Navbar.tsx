import { Link } from 'react-router-dom';
import logoViagem from '../assets/logo.webp';
import '../styles/components/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoViagem} alt="Logo viagem" className="logo-viagem" />
      </div>

      <ul className="navbar-pages">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/viagens">Viagens</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

