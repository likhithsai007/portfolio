import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Instant dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  
  // Trailing ring
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const ringXSpring = useSpring(ringX, { damping: 25, stiffness: 150, mass: 0.8 });
  const ringYSpring = useSpring(ringY, { damping: 25, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e) => {
      dotX.set(e.clientX - 6); // Center of 12px dot
      dotY.set(e.clientY - 6);
      
      ringX.set(e.clientX - 25); // Center of 50px ring
      ringY.set(e.clientY - 25);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [dotX, dotY, ringX, ringY, isVisible]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#FF6B00', // vibrant orange
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '1.5px solid rgba(151, 76, 23, 0.58)', // orange border
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringXSpring,
          y: ringYSpring,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(92, 48, 16, 0.15)' : 'transparent',
          transition: {
            scale: { type: 'spring', stiffness: 300, damping: 20 },
            backgroundColor: { duration: 0.2 }
          }
        }}
      />
    </>
  );
};

export default CustomCursor;
