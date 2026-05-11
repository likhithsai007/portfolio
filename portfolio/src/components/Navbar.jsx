import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '1rem 0' : '1.5rem 0',
        transition: 'all 0.3s ease',
      }}
      className={scrolled ? 'glass' : ''}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#hero" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
          Portfolio<span style={{ color: 'var(--text-muted)' }}>.</span>
        </a>
        
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <ul style={{ display: 'flex', gap: '2rem', fontWeight: 500 }}>
            <li><a href="#about" style={{ transition: 'color 0.3s' }}>About</a></li>
            <li><a href="#projects" style={{ transition: 'color 0.3s' }}>Projects</a></li>
            <li><a href="#blog" style={{ transition: 'color 0.3s' }}>Blog</a></li>
            <li><a href="#contact" style={{ transition: 'color 0.3s' }}>Contact</a></li>
          </ul>
          
          <button 
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-color)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
