const express = require('express');
const Workshop = require('../models/Workshop');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Create workshop (auth required)
router.post('/', authenticate, async (req, res) => {
  const { title, date, desc } = req.body;
  if (!title || !date || !desc) return res.status(400).json({ message: 'All fields required' });

  try {
    const w = await Workshop.create({ title, date, desc, creator: req.user._id });
    res.json(w);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List workshops (public)
router.get('/', async (req, res) => {
  try {
    const list = await Workshop.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
