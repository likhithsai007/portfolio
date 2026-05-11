import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const technicalSkills = [
  {
    category: "Programming Languages",
    skills: ["C", "Java", "Python", "JavaScript", "SQL"]
  },
  {
    category: "Web Technologies",
    skills: ["HTML", "CSS", "React.js", "Node.js", "Express", "Tailwind CSS", "Vanilla CSS", "MongoDB", "PostgreSQL", "Flutter"]
  },
  {
    category: "Version Control",
    skills: ["Git", "GitHub"]
  }
];

const iconMap = {
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Vanilla CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "Flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
};

const nonTechnicalSkills = [
  "Problem Solving", "Team Collaboration", "Agile Methodologies",
  "Effective Communication", "Adaptability", "Time Management", "Creative Thinking"
];

const About = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const activeSkills = activeTab === 'technical' ? technicalSkills : nonTechnicalSkills;

  return (
    <section id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About <span>Me</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <div>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-color)', marginBottom: '1.5rem' }}>
                I'm a versatile Full Stack Developer passionate about building robust, scalable applications.
                 With hands-on experience across the entire stack — from sleek, responsive web development and backend engineering 
                 to designing and consuming REST APIs — I also bring strong foundations in system architecture design and 
                 operating systems, enabling me to build solutions that are not just functional, but structurally sound and
                  performance-aware at every layer.              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                My journey involves integrating cutting-edge technologies like voice-navigated interfaces and machine learning services into practical applications. Whether I'm designing a premium UI or architecting a database, I focus on delivering seamless digital experiences.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Core Skills</h3>
              
              {/* Menu for Skills */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                <button 
                  onClick={() => setActiveTab('technical')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: activeTab === 'technical' ? 600 : 400,
                    color: activeTab === 'technical' ? '#FF6B00' : 'var(--text-muted)',
                    transition: 'color 0.3s ease',
                    position: 'relative'
                  }}
                >
                  Technical
                  {activeTab === 'technical' && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      style={{ position: 'absolute', bottom: '-0.5rem', left: 0, right: 0, height: '2px', background: '#FF6B00' }}
                    />
                  )}
                </button>

                <button 
                  onClick={() => setActiveTab('nonTechnical')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: activeTab === 'nonTechnical' ? 600 : 400,
                    color: activeTab === 'nonTechnical' ? '#FF6B00' : 'var(--text-muted)',
                    transition: 'color 0.3s ease',
                    position: 'relative'
                  }}
                >
                  Non-Technical
                  {activeTab === 'nonTechnical' && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      style={{ position: 'absolute', bottom: '-0.5rem', left: 0, right: 0, height: '2px', background: '#FF6B00' }}
                    />
                  )}
                </button>
              </div>

              {/* Skills List */}
              <motion.div layout style={{ minHeight: '150px' }}>
                <AnimatePresence mode='popLayout'>
                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'technical' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {technicalSkills.map((section, sIdx) => (
                          <div key={section.category}>
                            <h4 style={{ color: '#FF6B00', marginBottom: '0.8rem', fontSize: '1rem', fontFamily: 'var(--font-display)', opacity: 0.9, letterSpacing: '0.5px' }}>
                              {section.category}
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                              {section.skills.map((skill, index) => (
                                <motion.span
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: (sIdx * 0.1) + (index * 0.05) }}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.5rem 1rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-color)',
                                    fontWeight: 500
                                  }}
                                >
                                  {iconMap[skill] && (
                                    <img 
                                      src={iconMap[skill]} 
                                      alt={skill} 
                                      style={{ 
                                        width: '18px', 
                                        height: '18px', 
                                        filter: (skill === 'Express' || skill === 'GitHub') ? 'invert(1)' : 'none' 
                                      }} 
                                    />
                                  )}
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                        {nonTechnicalSkills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'var(--card-bg)',
                              border: '1px solid var(--card-border)',
                              borderRadius: '20px',
                              fontSize: '0.9rem',
                              color: 'var(--text-color)',
                              fontWeight: 500
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
