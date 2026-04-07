import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Historias.css';

import historia1Img from '../assets/historia1.jpg';
import historia2Img from '../assets/historia2.jpg';
import historia3Img from '../assets/historia3.jpg';

export default function Historias() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  const historias = [
    {
      id: 1,
      cancion: "'Layla'",
      artista: "Eric Clapton",
      historia: "La escribió en una casa de Miami tras perder a Pattie Boyd con su mejor amigo. La casa sigue en pie en NW 55th Avenue.",
      bg: `linear-gradient(to bottom, rgba(13,13,13,0.2), rgba(13,13,13,0.9)), url(${historia1Img}) center/cover no-repeat`
    },
    {
      id: 2,
      cancion: "'La Bamba'",
      artista: "Ritchie Valens",
      historia: "Ligada a La Cienega, Veracruz. El ritmo huapango que Ritchie Valens popularizó existía 200 años antes.",
      bg: `linear-gradient(to bottom, rgba(13,13,13,0.2), rgba(13,13,13,0.9)), url(${historia2Img}) center/cover no-repeat`
    },
    {
      id: 3,
      cancion: "'Heroes'",
      artista: "David Bowie",
      historia: "Grabada en los estudios Hansa de Berlín, a 500 metros del Muro. Las ventanas del estudio daban directamente a una torre de vigilancia.",
      bg: `linear-gradient(to bottom, rgba(13,13,13,0.2), rgba(13,13,13,0.9)), url(${historia3Img}) center/cover no-repeat`
    }
  ];

  return (
    <section className="historias" id="historias" ref={sectionRef}>
      <div className={`historias-container fade-slide-up ${isVisible ? 'in-view' : ''}`}>
        <h2 className="title historias-title">No son solo puntos en un mapa.</h2>
        
        <div className="historias-grid">
          {historias.map((historia, idx) => (
            <div 
              key={historia.id} 
              className="historia-card"
              style={{ 
                background: historia.bg,
                transitionDelay: `${idx * 150}ms` 
              }}
            >
              <div className="historia-content">
                <div className="historia-header">
                  <h3 className="title cancion-title">{historia.cancion}</h3>
                  <span className="label-ui cancion-artista">{historia.artista}</span>
                </div>
                <p className="historia-body">
                  {historia.historia}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
