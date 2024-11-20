import React from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from '../components/NavbarMenu';

const Navbar = () => {
  return (
    <section className="navbar-main-container">
      <div className="navbar-company-name">
        <Link to="/" className="navbar-company-name--text">
          Beestattoos_
        </Link>
      </div>
      <NavbarMenu />
    </section>
  );
};

export default Navbar;
