const express = require('express');
const router = express.Router();
const Personality = require('../models/Personality');
const Resource = require('../models/Resource');

// list (optional ?search=)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      const all = await Personality.find().sort({ name: 1 });
      return res.json(all);
    }
    const results = await Personality.find({ $text: { $search: search } }).limit(200);
    res.json(results);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// get single
router.get('/:id', async (req, res) => {
  try {
    const p = await Personality.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// mapped resources
router.get('/:id/resources', async (req, res) => {
  try {
    const resources = await Resource.find({ mappedPersonalities: req.params.id }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// create (admin)
router.post('/', async (req, res) => {
  try {
    const p = new Personality(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
