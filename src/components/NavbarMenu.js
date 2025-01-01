import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavbarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
        console.log(decoded);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

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
      <ul className={`navbar-menu ${isMenuOpen ? "Menu-open" : "Menu-close"}`}>
        <li><Link to="/">Rifas</Link></li>
        <li><Link to="/galeria">Ganadores</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        {userInfo ? (
          <>
            <li><Link to="/perfil">Mi Perfil ({userInfo.sub})</Link></li>
            {userInfo.role == null  && <li><Link to="/adminPanel">Admin Panel</Link></li>}
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken"); 
                  window.location.reload(); 
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Inicia sesión</Link></li>
            <li><Link to="/register">Crear Cuenta</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavbarMenu;
