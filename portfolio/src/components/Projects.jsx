import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import GithubIcon from './GithubIcon';

const staticProjects = [
  {
    title: "Student Smart Team Formation",
    description: "A unified full-stack platform managing student team formations, hosted on Vercel with comprehensive end-to-end testing.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/likhithsai007/Smart-Team-Formation",
    live: "#"
  },
  {
    title: "Inclusive Voice Kiosk",
    description: "A fully functional, voice-navigable Kiosk AI assistant with seamless browser-level speech synthesis and multi-stage entry flows.",
    tech: ["React", "Node.js", "Voice Interfaces", "Tailwind CSS"],
    github: "https://github.com/likhithsai007",
    live: "#"
  },
  {
    title: "Physio Progress Tracker",
    description: "A robust backend system for rehabilitation tracking featuring JWT auth, RBAC, and PostgreSQL integration without ORMs.",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
    github: "https://github.com/likhithsai007/physioConnect",
    live: "#"
  },
  {
    title: "ML Model Deployment Service",
    description: "A specialized machine learning service providing predictions through a RESTful API integrated with a frontend dashboard.",
    tech: ["Python", "Machine Learning", "REST API", "React"],
    github: "https://github.com/likhithsai007",
    live: "#"
  }
];

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'https://portfolio-e6r3.onrender.com/api'}/projects`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setProjectsData(data.data);
        } else {
          setProjectsData(staticProjects);
        }
      })
      .catch(err => {
        console.error("Failed to fetch projects, using fallback:", err);
        setProjectsData(staticProjects);
      });
  }, []);

  return (
    <section id="projects" style={{ background: '#0a0a0a' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Selected <span>Works</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', perspective: '1000px' }}>
            {projectsData.map((project, index) => (
              <ProjectCard key={project._id || index} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  
  // Mouse position relative to center of card (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth tilt and parallax return
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });
  
  // 3D Rotation transforms
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Dynamic glare effect following cursor
  const glareX = useTransform(springX, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["100%", "0%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 80%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalize mouse coords to -0.5 to 0.5
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        position: 'relative',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'none',
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      {/* Glare Layer */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          background: glareBackground,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      
      {/* Content Layer (Parallax popped out) */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d", display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <a href={project.github} style={{ color: 'var(--text-muted)', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <GithubIcon size={20} />
            </a>
            <a href={project.live} style={{ color: 'var(--text-muted)', transition: 'color 0.2s', cursor: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
          {project.description}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
          {(project.techStack || project.tech || []).map(tech => (
            <span key={tech} style={{ fontSize: '0.8rem', color: '#aaa', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
