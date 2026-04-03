import React from 'react';
import logoNav from '../assets/uap-blanco.svg'; // Importación del SVG

const Navbar = ({ isAuthenticated, onLogout, onGoToLogin, onGoToRegister, view }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
       <a className="navbar-brand d-flex align-items-center" href="#!">
          {/* Implementación del Logo SVG */}
          <img 
            src={logoNav} 
            alt="Logo Navbar" 
            height="40" 
            className="d-inline-block align-top me-2" 
          />
        </a>

        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${view === 'login' ? 'active' : ''}`}
                    onClick={onGoToLogin}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${view === 'register' ? 'active' : ''}`}
                    onClick={onGoToRegister}
                  >
                    Registro
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-outline-danger btn-sm ms-lg-3" onClick={onLogout}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;