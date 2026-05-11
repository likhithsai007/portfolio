import React from 'react';
import CustomCursor from './components/CustomCursor';
import SplashCursor from './components/SplashCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <SplashCursor 
        DENSITY_DISSIPATION={8}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.25}
        CURL={18}
        SPLAT_RADIUS={0.44}
        SPLAT_FORCE={4500}
        COLOR_UPDATE_SPEED={18}
        SHADING={false}
        RAINBOW_MODE={false}
        COLOR="#FF6B00"
      />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
