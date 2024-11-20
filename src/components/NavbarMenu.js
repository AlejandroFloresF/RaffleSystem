import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-button-container">
      <label className="burger" htmlFor="burger">
        <input type="checkbox" id="burger" onClick={handleClick} />
        <span></span>
        <span></span>
        <span></span>
      </label>
      <ul className={`navbar-menu ${isMenuOpen ? 'Menu-open' : 'Menu-close'}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/galeria">Galería</Link></li>
        <li><Link to="/portafolio">Portafolio</Link></li>
        <li><Link to="/citas">Citas</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
};

export default NavbarMenu;
