import React, { useState } from 'react';
import { useScrollY } from '../hooks/useScrollY';
import './Navbar.css';

export default function Navbar() {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 80;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="navbar-logo" onClick={closeMenu}>
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

        <button
          className="hamburger"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#concepto" className="label-ui" onClick={closeMenu}>Cómo funciona</a>
        <a href="#mapa" className="label-ui" onClick={closeMenu}>El Mapa</a>
        <a href="#historias" className="label-ui" onClick={closeMenu}>Historias</a>
        <a href="#precios" className="label-ui" onClick={closeMenu}>Precios</a>
        <a href="#login" className="label-ui" onClick={closeMenu}>Entrar</a>
        <a href="#precios" className="label-ui cta-btn-mobile" onClick={closeMenu}>Empezar</a>
      </div>
    </nav>
  );
}
