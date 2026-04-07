import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Concepto.css';

export default function Concepto() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section className="concepto" id="concepto" ref={sectionRef}>
      <div className="concepto-container">
        <div className={`concepto-col fade-slide-up ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '0ms' }}>
          <div className="concepto-number title">01</div>
          <h2 className="concepto-title title">Encontramos el lugar</h2>
          <p className="concepto-body">
            Desde un bar de Memphis hasta un piso en Londres, localizamos dónde nació, se sintió o se filmó la canción.
          </p>
        </div>
        
        <div className={`concepto-col fade-slide-up ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '150ms' }}>
          <div className="concepto-number title">02</div>
          <h2 className="concepto-title title">Contamos la historia</h2>
          <p className="concepto-body">
            Investigación real. Historia real. Entrevistas con compositores, diarios de localizaciones, notas de producción.
          </p>
        </div>
        
        <div className={`concepto-col fade-slide-up ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '300ms' }}>
          <div className="concepto-number title">03</div>
          <h2 className="concepto-title title">Tú planeas la ruta</h2>
          <p className="concepto-body">
            Filtra por país, década, artista o género. Construye una peregrinación musical completamente tuya.
          </p>
        </div>
      </div>
    </section>
  );
}
