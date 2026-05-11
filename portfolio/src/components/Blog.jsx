import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [deletePasscode, setDeletePasscode] = useState('');
  const [formData, setFormData] = useState({ title: '', content: '', tags: '', passcode: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://portfolio-e6r3.onrender.com/api'}/blogs`);
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const handlePostBlog = async (e) => {
    e.preventDefault();
    setStatus('posting');
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://portfolio-e6r3.onrender.com/api'}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tags: tagsArray })
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ title: '', content: '', tags: '', passcode: '' });
        setStatus('');
        fetchBlogs();
      } else {
        const errorData = await res.json();
        setStatus(errorData.error || 'error');
      }
    } catch(err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleDeleteBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://portfolio-e6r3.onrender.com/api'}/blogs/${blogToDelete}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: deletePasscode })
      });
      if (res.ok) {
        setBlogToDelete(null);
        setDeletePasscode('');
        fetchBlogs();
      } else {
        alert('Incorrect passcode or error deleting');
      }
    } catch(err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <section id="blog" style={{ background: 'var(--bg-color)', paddingBottom: '4rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Latest <span>Articles</span></h2>
            <button 
              className="btn btn-outline" 
              onClick={() => setShowModal(true)}
              style={{ fontSize: '0.9rem', padding: '0.8rem 1.5rem', background: 'var(--card-bg)' }}
            >
              + Post New Blog
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {blogs.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No blogs found. Be the first to post!</p>}
            {blogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} setBlogToDelete={setBlogToDelete} />
            ))}
          </div>
        </motion.div>

        {blogToDelete && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <form onSubmit={handleDeleteBlog} style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem', fontFamily: 'var(--font-display)' }}>Confirm Deletion</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Enter Admin Passcode to permanently delete this blog.</p>
              <input 
                type="password" 
                placeholder="Admin Passcode" 
                required 
                value={deletePasscode} 
                onChange={e => setDeletePasscode(e.target.value)} 
                style={{ ...inputStyle, borderColor: '#ef4444' }} 
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-outline" style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', padding: '1rem' }}>
                  Delete
                </button>
                <button type="button" className="btn btn-outline" onClick={() => { setBlogToDelete(null); setDeletePasscode(''); }} style={{ flex: 1, padding: '1rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <form onSubmit={handlePostBlog} style={{ background: 'var(--card-bg)', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '500px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>Post New Blog</h3>
              
              <input 
                type="text" 
                placeholder="Blog Title" 
                required 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                style={inputStyle} 
              />
              
              <textarea 
                placeholder="Write your content here..." 
                required 
                rows={6} 
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})} 
                style={{ ...inputStyle, resize: 'vertical' }} 
              />
              
              <input 
                type="text" 
                placeholder="Tags (comma separated, e.g. React, Node.js)" 
                value={formData.tags} 
                onChange={e => setFormData({...formData, tags: e.target.value})} 
                style={inputStyle} 
              />
              
              <input 
                type="password" 
                placeholder="Admin Passcode" 
                required 
                value={formData.passcode} 
                onChange={e => setFormData({...formData, passcode: e.target.value})} 
                style={{ ...inputStyle, borderColor: 'var(--primary-color)' }} 
              />
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" disabled={status === 'posting'} className="btn btn-outline" style={{ flex: 1, background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '1rem' }}>
                  {status === 'posting' ? 'Posting...' : 'Publish Blog'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '1rem' }}>
                  Cancel
                </button>
              </div>
              {status && status !== 'posting' && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>{status === 'error' ? 'Error posting blog.' : status}</p>}
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  marginBottom: '1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--card-border)',
  borderRadius: '8px',
  color: 'var(--text-color)',
  outline: 'none',
  boxSizing: 'border-box'
};

const BlogCard = ({ blog, index, setBlogToDelete }) => {
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const glareX = useTransform(springX, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["100%", "0%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 80%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
        <button 
          onClick={() => setBlogToDelete(blog._id)} 
          style={{ position: 'absolute', top: '-1rem', right: '-1rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', padding: '0.5rem', zIndex: 3 }}
          title="Delete Blog"
        >
          ✕
        </button>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', paddingRight: '1.5rem' }}>{blog.title}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', whiteSpace: 'pre-wrap', flex: 1, lineHeight: 1.6 }}>{blog.content}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {blog.tags.map(tag => (
            <span key={tag} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '4px', color: '#aaa' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
