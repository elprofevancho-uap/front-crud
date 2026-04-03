import React from 'react';
import logoFoot from '../assets/logo-azul.svg';

const Footer = () => {
  return (
    <footer className="py-5 bg-white border-top mt-auto">
      <div className="container text-center">
        <img 
          src={logoFoot} 
          alt="Logo Footer" 
          height="60" 
          className="mb-3" 
        />
        <p className="text-muted mb-0">
          &copy; 2026 - Todos los derechos reservados.
        </p>
        <div className="mt-2">
          <a href="#!" className="text-decoration-none text-muted mx-2">Privacidad</a>
          <a href="#!" className="text-decoration-none text-muted mx-2">Términos</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;