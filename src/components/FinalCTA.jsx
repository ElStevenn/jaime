import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './FinalCTA.css';

export default function FinalCTA() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className="final-cta" ref={sectionRef}>
      <div className="cta-bg-container">
        <div className={`cta-bg ${isVisible ? 'scale-in' : ''}`}></div>
        <div className="cta-overlay"></div>
      </div>
      
      <div className={`cta-content fade-slide-up ${isVisible ? 'in-view' : ''}`}>
        <h2 className="title cta-title">La música te espera.</h2>
        <p className="cta-subtitle">
          Empieza con 14 días gratis. Sin tarjeta de crédito.
        </p>
        <a href="#register" className="label-ui cta-button">
          Comienza tu viaje
        </a>
      </div>
    </section>
  );
}
