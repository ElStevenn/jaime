import React from 'react';
import { useScrollY } from '../hooks/useScrollY';
import './Navbar.css';

export default function Navbar() {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 80;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          <span className="logo-main">IMP</span>
          <span className="logo-sub">Iconic Music Points</span>
        </a>
        <div className="navbar-links">
          <a href="#concepto" className="label-ui">Cómo funciona</a>
          <a href="#mapa" className="label-ui">El Mapa</a>
          <a href="#historias" className="label-ui">Historias</a>
          <a href="#precios" className="label-ui">Precios</a>
          <a href="#login" className="label-ui login-link">Entrar</a>
          <a href="#precios" className="label-ui cta-btn">Empezar</a>
        </div>
      </div>
    </nav>
  );
}
