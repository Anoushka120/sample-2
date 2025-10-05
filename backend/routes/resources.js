const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// list with optional search & personality filter
router.get('/', async (req, res) => {
  try {
    const { search, personality } = req.query;
    const filter = {};
    if (personality) filter.mappedPersonalities = personality;

    if (search) {
      const results = await Resource.find({ $text: { $search: search }, ...filter }).limit(200);
      return res.json(results);
    }
    const list = await Resource.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(list);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', async (req, res) => {
  try {
    const r = new Resource(req.body);
    await r.save();
    res.status(201).json(r);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
