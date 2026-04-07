import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Precios.css';

export default function Precios() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section className="precios" id="precios" ref={sectionRef}>
      <div className="precios-container">
        <h2 className={`title precios-title spring-up ${isVisible ? 'in-view' : ''}`}>Elige tu viaje.</h2>
        
        <div className="precios-grid">
          {/* Plan Viajero */}
          <div 
            className={`precio-card spring-up ${isVisible ? 'in-view' : ''}`} 
            style={{ transitionDelay: '0ms' }}
          >
            <div className="precio-header">
              <h3 className="label-ui precio-name">Viajero</h3>
              <div className="precio-amount title">9€<span className="precio-period">/mes</span></div>
            </div>
            <ul className="precio-features">
              <li>Acceso completo al mapa</li>
              <li>Filtros avanzados</li>
              <li>Generador de rutas</li>
              <li>App móvil</li>
            </ul>
            <button className="precio-btn btn-ghost label-ui">Elegir Viajero</button>
          </div>

          {/* Plan Explorador (Destacado) */}
          <div 
            className={`precio-card precio-destacado spring-up ${isVisible ? 'in-view' : ''}`} 
            style={{ transitionDelay: '150ms' }}
          >
            <div className="precio-header">
              <h3 className="label-ui precio-name">Explorador</h3>
              <div className="precio-amount title">79€<span className="precio-period">/año</span></div>
            </div>
            <ul className="precio-features">
              <li><strong>Todo lo de Viajero, más:</strong></li>
              <li>Mapas offline</li>
              <li>Historias exclusivas</li>
              <li>Acceso anticipado a nuevos IMPs</li>
            </ul>
            <button className="precio-btn btn-primary label-ui">Elegir Explorador</button>
          </div>

          {/* Plan Partner */}
          <div 
            className={`precio-card spring-up ${isVisible ? 'in-view' : ''}`} 
            style={{ transitionDelay: '300ms' }}
          >
            <div className="precio-header">
              <h3 className="label-ui precio-name">Partner</h3>
              <div className="precio-amount title">Personalizado</div>
            </div>
            <ul className="precio-features">
              <li>Agencias de viaje y reservas</li>
              <li>Acceso API</li>
              <li>Rutas white-label</li>
              <li>Soporte dedicado</li>
            </ul>
            <button className="precio-btn btn-ghost label-ui">Contactar</button>
          </div>
        </div>
      </div>
    </section>
  );
}
