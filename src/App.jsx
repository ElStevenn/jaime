import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Concepto from './components/Concepto';
import MapaPreview from './components/MapaPreview';
import Historias from './components/Historias';
import Precios from './components/Precios';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Concepto />
        <MapaPreview />
        <Historias />
        <Precios />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
