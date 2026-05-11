import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--card-border)', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Designed & Built by You.
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#hero" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
