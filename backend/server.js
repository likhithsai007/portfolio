import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import Project from './models/Project.js';
import Blog from './models/Blog.js';

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// --- Simple Endpoints ---

// 1. Health Check Route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Portfolio API!', status: 'Running smoothly' });
});

// 2. Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please provide name, email and message' });
    }

    // Save to database
    const contact = await Contact.create({ name, email, message });
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully!',
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Get all messages (For admin dashboard if needed later)
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Project Endpoints ---

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add a new project (Secured)
app.post('/api/projects', async (req, res) => {
  try {
    const { passcode, ...projectData } = req.body;
    if (passcode !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid Admin Passcode' });
    }
    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// --- Blog Endpoints ---

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add a new blog (Secured)
app.post('/api/blogs', async (req, res) => {
  try {
    const { passcode, ...blogData } = req.body;
    if (passcode !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid Admin Passcode' });
    }
    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete a blog (Secured)
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { passcode } = req.body;
    if (passcode !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid Admin Passcode' });
    }
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
