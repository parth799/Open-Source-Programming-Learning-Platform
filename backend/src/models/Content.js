import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['documentation', 'tutorial', 'video', 'practice', 'roadmap'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  prerequisites: [{
    type: String,
  }],
  tags: [{
    type: String,
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  metadata: {
    duration: String,
    lastUpdated: Date,
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: Number,
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp
contentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search functionality
contentSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Content = mongoose.model('Content', contentSchema);

export default Content; 