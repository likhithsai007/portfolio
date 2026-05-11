import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  techStack: {
    type: [String], // Array of strings (e.g., ["React", "Node.js", "MongoDB"])
    default: []
  },
  imageUrl: {
    type: String,
    default: 'no-image.jpg'
  },
  githubLink: {
    type: String,
    default: ''
  },
  liveLink: {
    type: String,
    default: ''
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Project', ProjectSchema);
