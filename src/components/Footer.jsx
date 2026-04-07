import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-left">
            <a href="#" className="footer-logo">
              <span className="logo-main">IMP</span>
              <span className="logo-sub">Iconic Music Points</span>
            </a>
          </div>
          <div className="footer-right">
            <div className="footer-nav">
              <a href="#about" className="label-ui">Sobre nosotros</a>
              <a href="#concepto" className="label-ui">Cómo funciona</a>
              <a href="#precios" className="label-ui">Precios</a>
              <a href="#blog" className="label-ui">Blog</a>
              <a href="#partner" className="label-ui">Hazte Partner</a>
              <a href="#privacy" className="label-ui">Privacidad</a>
            </div>
            <div className="footer-social">
              <a href="#ig" className="label-ui">Instagram</a>
              <a href="#tk" className="label-ui">TikTok</a>
              <a href="#sp" className="label-ui">Spotify</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Iconic Music Points. Hecho para los que escuchan diferente.</p>
        </div>
      </div>
    </footer>
  );
}
