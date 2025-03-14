import express from 'express';
import Content from '../models/Content.js';
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Get all content for a specific language
router.get('/language/:language', async (req, res) => {
  try {
    const { language } = req.params;
    const { type, difficulty, status = 'published' } = req.query;

    const query = { language, status };
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;

    const content = await Content.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('author', 'username')
      .populate('metadata.reviews.user', 'username');

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Increment view count
    content.metadata.views += 1;
    await content.save();

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

// Create new content (instructor/admin only)
router.post('/', auth, checkRole(['instructor', 'admin']), async (req, res) => {
  try {
    const content = new Content({
      ...req.body,
      author: req.user.userId,
    });

    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error: error.message });
  }
});

// Update content (instructor/admin only)
router.put('/:id', auth, checkRole(['instructor', 'admin']), async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Check if user is the author or admin
    if (content.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this content' });
    }

    Object.assign(content, req.body);
    await content.save();

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error: error.message });
  }
});

// Delete content (admin only)
router.delete('/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error: error.message });
  }
});

// Add review to content
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Add review
    content.metadata.reviews.push({
      user: req.user.userId,
      rating,
      comment,
    });

    // Update average rating
    const totalRating = content.metadata.reviews.reduce((sum, review) => sum + review.rating, 0);
    content.metadata.rating = totalRating / content.metadata.reviews.length;

    await content.save();

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
});

// Search content
router.get('/search', async (req, res) => {
  try {
    const { query, language, type, difficulty } = req.query;

    const searchQuery = { status: 'published' };
    if (language) searchQuery.language = language;
    if (type) searchQuery.type = type;
    if (difficulty) searchQuery.difficulty = difficulty;

    const content = await Content.find(
      query ? { ...searchQuery, $text: { $search: query } } : searchQuery,
      { score: { $meta: 'textScore' } }
    )
      .populate('author', 'username')
      .sort({ score: { $meta: 'textScore' } });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error searching content', error: error.message });
  }
});

export default router; 