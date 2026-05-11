import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import RedditIcon from './RedditIcon';
import LinkedinIcon from './LinkedinIcon';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://portfolio-e6r3.onrender.com/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ paddingBottom: '4rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '4rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }} />

          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
            Let's work together
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', position: 'relative', zIndex: 1 }}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1, maxWidth: '500px', margin: '0 auto 3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-color)', outline: 'none' }} 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-color)', outline: 'none' }} 
            />
            <textarea 
              placeholder="Your Message" 
              required 
              rows={4} 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})} 
              style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-color)', outline: 'none', resize: 'vertical' }} 
            />
            <button 
              type="submit" 
              className="btn btn-outline" 
              disabled={status === 'sending'}
              onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#6b7280' }}
              onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = '#f97316' }}
              style={{ 
                padding: '1rem', 
                cursor: status === 'sending' ? 'not-allowed' : 'pointer', 
                background: status === 'sending' ? '#6b7280' : '#f97316', 
                color: '#fff', 
                border: 'none',
                transition: 'background 0.3s ease',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p style={{ color: '#4ade80', marginTop: '0.5rem' }}>Message sent successfully!</p>}
            {status === 'error' && <p style={{ color: '#ef4444', marginTop: '0.5rem' }}>Failed to send message. Try again.</p>}
          </form>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=likhithsaivinnakota@gmail.com" 
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-mail"
              style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem', transition: 'all 0.3s ease' }}
            >
              <Mail size={20} /> Say Hello
            </a>
            
            <a 
              href="https://www.linkedin.com/in/likhith-sai-vinnakota-2533a62b8/" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline btn-linkedin"
              style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem', transition: 'all 0.3s ease' }}
            >
              <LinkedinIcon size={20} /> LinkedIn <ArrowUpRight size={18} />
            </a>
            
            <a 
              href="https://github.com/likhithsai007" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline btn-github"
              style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem', transition: 'all 0.3s ease' }}
            >
              <GithubIcon size={20} /> GitHub <ArrowUpRight size={18} />
            </a>

            <a 
              href="https://www.reddit.com/user/CreativePick1326/" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-outline btn-reddit"
              style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem', transition: 'all 0.3s ease' }}
            >
              <RedditIcon size={20} /> Reddit <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
