import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovering = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fluid spring physics for the cursor tracking
  const springX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 0.8 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 0.8 });
  const springHover = useSpring(isHovering, { damping: 20, stiffness: 100 });

  // Blob properties
  const BLOB_SIZE = 450;
  const blobScale = useTransform(springHover, [0, 1], [0, 1]);

  // Center the blob exactly on the cursor
  const blobX = useTransform(springX, x => x - BLOB_SIZE / 2);
  const blobY = useTransform(springY, y => y - BLOB_SIZE / 2);

  // Parallax offsets for the 3D mouse-tracking layer effect
  const bgX = useTransform(springX, [0, windowSize.width], [40, -40]);
  const bgY = useTransform(springY, [0, windowSize.height], [40, -40]);

  const textX = useTransform(springX, [0, windowSize.width], [-20, 20]);
  const textY = useTransform(springY, [0, windowSize.height], [-20, 20]);

  // Image counter-offset math
  // We want the image to be 110vw/vh to prevent edge showing during parallax.
  // The image must counteract the blob's position so it appears stationary relative to the screen,
  // then we add the parallax offset (bgX/bgY) and the centering offset for 110vw.
  const imgX = useTransform([blobX, bgX], ([bx, px]) => -bx + px - (windowSize.width * 0.05));
  const imgY = useTransform([blobY, bgY], ([by, py]) => -by + py - (windowSize.height * 0.05));

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    // Using clientX/Y directly for smooth screen-space parallax mapping
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isHovering.set(1)}
      onMouseLeave={() => isHovering.set(0)}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Morphing Blob Window Layer */}
      <motion.div
        className="morph-blob"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: BLOB_SIZE,
          height: BLOB_SIZE,
          x: blobX,
          y: blobY,
          scale: blobScale,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            width: '110vw',
            height: '110vh',
            x: imgX,
            y: imgY,
            backgroundImage: 'url("/image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* Dark overlay specifically inside the blob if needed? No, the background is global.
          If we want to dim the image itself slightly, we can add it here. */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(5, 5, 5, 0.4)',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: blobScale // Only show overlay when blob is visible
        }}
      />

      {/* Foreground Content Layer */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: '800px', pointerEvents: 'none', x: textX, y: textY }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 500 }}>
              Hello, I am
            </p>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '2rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              mixBlendMode: 'difference' // Adds premium pop when intersecting the blob
            }}>
              Likhith Sai <br />
              <span className="text-gradient">Tech Enthusiast.</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: 'var(--text-color)',
              marginBottom: '3rem',
              maxWidth: '600px',
              lineHeight: 1.6,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              I'm a 2nd-year CSE student passionate about building exceptional and accessible digital experiences for the web and mobile devices.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn btn-primary">
                View Work <ArrowRight size={20} />
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
