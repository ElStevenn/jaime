import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import usaMap from '../assets/usa-map.svg';
import './MapaPreview.css';

const PINS = [
  { id: 0, nombre: "Hotel Chelsea", ciudad: "Nueva York, NY", cancion: "\u201CChelsea Hotel #2\u201D", artista: "Leonard Cohen", año: 1974, top: 28, left: 79 },
  { id: 1, nombre: "Sun Studio", ciudad: "Memphis, TN", cancion: "\u201CThat's All Right\u201D", artista: "Elvis Presley", año: 1954, top: 52, left: 62 },
  { id: 2, nombre: "Laurel Canyon", ciudad: "Los \u00C1ngeles, CA", cancion: "\u201CCalifornia Dreamin'\u201D", artista: "The Mamas & The Papas", año: 1965, top: 48, left: 14 },
  { id: 3, nombre: "Muscle Shoals", ciudad: "Alabama", cancion: "\u201CWild Horses\u201D", artista: "The Rolling Stones", año: 1971, top: 55, left: 67 },
  { id: 4, nombre: "Big Pink House", ciudad: "Woodstock, NY", cancion: "\u201CThe Weight\u201D", artista: "The Band", año: 1968, top: 26, left: 78 },
  { id: 5, nombre: "Chess Records", ciudad: "Chicago, IL", cancion: "\u201CJohnny B. Goode\u201D", artista: "Chuck Berry", año: 1958, top: 33, left: 65 },
  { id: 6, nombre: "Fillmore West", ciudad: "San Francisco, CA", cancion: "\u201CWhite Rabbit\u201D", artista: "Jefferson Airplane", año: 1967, top: 38, left: 10 },
  { id: 7, nombre: "RCA Studio B", ciudad: "Nashville, TN", cancion: "\u201CCrazy\u201D", artista: "Patsy Cline", año: 1961, top: 50, left: 65 },
];

const FILTERS = [
  "\uD83C\uDDEA\uD83C\uDDF8 Espa\u00F1a", "\uD83C\uDDFA\uD83C\uDDF8 Estados Unidos", "\uD83C\uDDEC\uD83C\uDDE7 Reino Unido",
  "Rock", "Blues", "A\u00F1os 70", "A\u00F1os 90",
  "Bob Dylan", "Fleetwood Mac"
];

export default function MapaPreview() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const [hoveredPin, setHoveredPin] = useState(null);
  const [lockedPin, setLockedPin] = useState(null);

  const activePin = lockedPin !== null ? lockedPin : hoveredPin;

  const handleContainerClick = (e) => {
    if (!e.target.closest('.mapa-pin') && !e.target.closest('.pin-tooltip')) {
      setLockedPin(null);
    }
  };

  return (
    <section className="mapa-preview" id="mapa" ref={sectionRef}>
      <div className={`mapa-header fade-slide-up ${isVisible ? 'in-view' : ''}`}>
        <h2 className="title">El mapa sigue creciendo.</h2>
        <p className="mapa-subtitle">M&aacute;s de 400 Iconic Music Points en 38 pa&iacute;ses, y contando.</p>
      </div>

      <div className="mapa-content">
        <div className={`mapa-pills fade-slide-up ${isVisible ? 'in-view' : ''}`} style={{ transitionDelay: '150ms' }}>
          {FILTERS.map((filter, idx) => (
            <button key={idx} className="mapa-pill label-ui">
              {filter}
            </button>
          ))}
        </div>

        <div
          className={`mapa-mockup fade-slide-up ${isVisible ? 'in-view' : ''}`}
          style={{ transitionDelay: '300ms' }}
          onClick={handleContainerClick}
        >
          <img src={usaMap} alt="Mapa de Estados Unidos" className="mapa-img" draggable={false} />

          {PINS.map((pin) => {
            const isActive = activePin === pin.id;
            return (
              <div
                key={pin.id}
                className={`mapa-pin ${isActive ? 'active' : ''}`}
                style={{ top: `${pin.top}%`, left: `${pin.left}%` }}
                onMouseEnter={() => setHoveredPin(pin.id)}
                onMouseLeave={() => { if (lockedPin !== pin.id) setHoveredPin(null); }}
                onClick={(e) => { e.stopPropagation(); setLockedPin(isActive && lockedPin === pin.id ? null : pin.id); }}
              >
                <div className="pin-dot" />

                {isActive && (
                  <div className={`pin-tooltip ${pin.top < 40 ? 'below' : 'above'} ${pin.left > 60 ? 'flip-left' : ''}`}>
                    <div className="tooltip-header">
                      <span className="tooltip-vinyl">&#x1F4BF;</span>
                      <span className="label-ui">{pin.nombre}, {pin.ciudad}</span>
                    </div>
                    <p className="tooltip-body">
                      {pin.cancion} de {pin.artista}, {pin.año}
                    </p>
                    <a href={`#historia-${pin.id}`} className="tooltip-link">Ver la historia completa &rarr;</a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
