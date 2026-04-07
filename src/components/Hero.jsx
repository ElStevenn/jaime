import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

// Lerp helper function
const lerp = (start, end, factor) => start + (end - start) * factor;

export default function Hero() {
  const bgRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // ±20px
      const y = (e.clientY / innerHeight - 0.5) * 40;
      targetPos.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateParallax = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.05);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.05);

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) scale(1.05)`;
      }

      requestRef.current = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg-container">
        <div className="hero-bg" ref={bgRef}></div>
        <div className="hero-overlay"></div>
        <div className="hero-gradient"></div>
      </div>

      <div className="hero-content">
        <div className="hero-label label-ui">Descubre la música detrás del lugar</div>
        <h1 className={`hero-title title ${isMounted ? 'animate' : ''}`}>
          <div className="title-line"><span className="title-text">CADA CANCIÓN</span></div>
          <div className="title-line"><span className="title-text">TIENE UN</span></div>
          <div className="title-line"><span className="title-text">LUGAR.</span></div>
        </h1>
        <p className="hero-body">
          Un mapa curado de los lugares reales que dieron vida a las canciones más icónicas de la historia.
        </p>
        <div className="hero-ctas">
          <a href="#explorar" className="btn btn-primary label-ui">
            <span className="btn-text">Empieza a explorar</span>
          </a>
          <a href="#historia" className="btn btn-ghost label-ui">
            <span className="btn-text">Ver la historia</span>
          </a>
        </div>
      </div>

      <div className="hero-vinyl">
        <img src="/src/assets/vinyl_disc.png" alt="Disco de vinilo girando" className="vinyl-img" />
      </div>
    </section>
  );
}
