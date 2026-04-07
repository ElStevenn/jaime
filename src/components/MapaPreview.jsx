import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './MapaPreview.css';

const IMPS = [
  { id: 0, nombre: "Hotel Chelsea", ciudad: "Nueva York, NY", lat: 40.7443, lng: -74.0018, cancion: "\u201CChelsea Hotel #2\u201D", artista: "Leonard Cohen", año: 1974 },
  { id: 1, nombre: "Sun Studio", ciudad: "Memphis, TN", lat: 35.1495, lng: -90.0490, cancion: "\u201CThat's All Right\u201D", artista: "Elvis Presley", año: 1954 },
  { id: 2, nombre: "Laurel Canyon", ciudad: "Los \u00C1ngeles, CA", lat: 34.1184, lng: -118.3927, cancion: "\u201CCalifornia Dreamin'\u201D", artista: "The Mamas & The Papas", año: 1965 },
  { id: 3, nombre: "Muscle Shoals", ciudad: "Alabama", lat: 34.7448, lng: -87.6678, cancion: "\u201CWild Horses\u201D", artista: "The Rolling Stones", año: 1971 },
  { id: 4, nombre: "Big Pink House", ciudad: "Woodstock, NY", lat: 42.0409, lng: -74.1168, cancion: "\u201CThe Weight\u201D", artista: "The Band", año: 1968 },
  { id: 5, nombre: "Chess Records", ciudad: "Chicago, IL", lat: 41.8827, lng: -87.6233, cancion: "\u201CJohnny B. Goode\u201D", artista: "Chuck Berry", año: 1958 },
  { id: 6, nombre: "Fillmore West", ciudad: "San Francisco, CA", lat: 37.7841, lng: -122.4330, cancion: "\u201CWhite Rabbit\u201D", artista: "Jefferson Airplane", año: 1967 },
  { id: 7, nombre: "RCA Studio B", ciudad: "Nashville, TN", lat: 36.1490, lng: -86.7923, cancion: "\u201CCrazy\u201D", artista: "Patsy Cline", año: 1961 },
];

const FILTERS = [
  "\uD83C\uDDEA\uD83C\uDDF8 Espa\u00F1a", "\uD83C\uDDFA\uD83C\uDDF8 Estados Unidos", "\uD83C\uDDEC\uD83C\uDDE7 Reino Unido",
  "Rock", "Blues", "A\u00F1os 70", "A\u00F1os 90",
  "Bob Dylan", "Fleetwood Mac"
];

export default function MapaPreview() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const projectionRef = useRef(null);
  const [topoData, setTopoData] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [lockedPin, setLockedPin] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Fetch TopoJSON on mount
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
      .then(res => res.json())
      .then(data => setTopoData(data))
      .catch(() => {});
  }, []);

  // ResizeObserver for responsive re-projection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Render D3 map whenever topoData or dimensions change
  useEffect(() => {
    if (!topoData || !dimensions.width || !svgRef.current) return;

    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll('g.map-layer').remove();

    const states = topojson.feature(topoData, topoData.objects.states);
    const nation = topojson.mesh(topoData, topoData.objects.states, (a, b) => a === b);

    const projection = d3.geoAlbersUsa().fitSize([width - 40, height - 40], states);
    projection.translate([width / 2, height / 2]);
    projectionRef.current = projection;

    const path = d3.geoPath().projection(projection);

    const g = svg.append('g').attr('class', 'map-layer');

    g.selectAll('path.state')
      .data(states.features)
      .join('path')
      .attr('class', 'state')
      .attr('d', path)
      .attr('fill', '#1c1c1c')
      .attr('stroke', '#555555')
      .attr('stroke-width', 0.8);

    g.append('path')
      .datum(nation)
      .attr('class', 'nation-border')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#8a7a5a')
      .attr('stroke-width', 1.5);

  }, [topoData, dimensions]);

  // Project a geographic point
  const project = useCallback((lng, lat) => {
    if (!projectionRef.current) return null;
    return projectionRef.current([lng, lat]);
  }, []);

  // Determine which pin to show tooltip for
  const activePin = lockedPin !== null ? lockedPin : hoveredPin;

  // Compute tooltip position and flip logic
  const getTooltipStyle = (imp) => {
    const coords = project(imp.lng, imp.lat);
    if (!coords) return { display: 'none' };

    const [x, y] = coords;
    const { width, height } = dimensions;
    const tooltipWidth = 280;
    const tooltipHeight = 140;

    let left = x;
    let flipH = false;
    let flipV = false;

    // Flip horizontally if too close to right edge
    if (x + tooltipWidth / 2 > width - 20) flipH = true;
    // Flip horizontally if too close to left edge
    if (x - tooltipWidth / 2 < 20) flipH = false; // keep right

    // Flip vertically if too close to top
    if (y - tooltipHeight - 30 < 10) flipV = true;

    const style = {
      position: 'absolute',
      left: `${x}px`,
      zIndex: 20,
    };

    if (flipV) {
      style.top = `${y + 20}px`;
    } else {
      style.top = `${y - 20}px`;
      style.transform = 'translate(-50%, -100%)';
    }

    if (flipH) {
      style.transform = `translate(-80%, ${flipV ? '0' : '-100%'})`;
    } else if (!flipV) {
      style.transform = 'translate(-50%, -100%)';
    } else {
      style.transform = 'translate(-50%, 0)';
    }

    return style;
  };

  // Click outside to unlock pin
  const handleContainerClick = (e) => {
    if (!e.target.closest('.mapa-pin-group') && !e.target.closest('.pin-tooltip')) {
      setLockedPin(null);
    }
  };

  return (
    <section className="mapa-preview" id="mapa" ref={sectionRef}>
      <div className={`mapa-header fade-slide-up ${isVisible ? 'in-view' : ''}`}>
        <h2 className="title">El mapa sigue creciendo.</h2>
        <p className="mapa-subtitle">Más de 400 Iconic Music Points en 38 países, y contando.</p>
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
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <svg
            ref={svgRef}
            className="mapa-svg"
            width={dimensions.width}
            height={dimensions.height}
            viewBox={`0 0 ${dimensions.width || 1} ${dimensions.height || 1}`}
          >
            {/* Pins as SVG circles on top of the D3 map layer */}
            {IMPS.map((imp, idx) => {
              const coords = project(imp.lng, imp.lat);
              if (!coords) return null;
              const [cx, cy] = coords;
              const isActive = activePin === imp.id;

              return (
                <g
                  key={imp.id}
                  className={`mapa-pin-svg ${isActive ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPin(imp.id)}
                  onMouseLeave={() => { if (lockedPin !== imp.id) setHoveredPin(null); }}
                  onClick={(e) => { e.stopPropagation(); setLockedPin(isActive && lockedPin === imp.id ? null : imp.id); }}
                >
                  <circle
                    className="pin-halo-svg"
                    cx={cx} cy={cy}
                    r={isActive ? 12 : 8}
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  />
                  <circle
                    className="pin-dot-svg"
                    cx={cx} cy={cy}
                    r={isActive ? 10 : 8}
                  />
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {activePin !== null && (() => {
            const imp = IMPS.find(i => i.id === activePin);
            if (!imp) return null;
            return (
              <div className="pin-tooltip" style={getTooltipStyle(imp)}>
                <div className="tooltip-header">
                  <span className="tooltip-vinyl">💿</span>
                  <span className="label-ui">{imp.nombre}, {imp.ciudad}</span>
                </div>
                <p className="tooltip-body">
                  {imp.cancion} de {imp.artista}, {imp.año}
                </p>
                <a href={`#historia-${imp.id}`} className="tooltip-link">Ver la historia completa &rarr;</a>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
