import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a blog title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please add blog content']
  },
  excerpt: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: 'no-image.jpg'
  },
  tags: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    default: 'Likhith'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Blog', BlogSchema);
