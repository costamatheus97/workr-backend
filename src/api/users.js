const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'Listing Users' });
});

router.post('/', (req, res, next) => {
  res.json({ message: 'Creating Users' });
});

router.put('/:id', (req, res, next) => {
  res.json({ message: 'Editing Users' });
});

router.delete('/:id', (req, res, next) => {
  res.json({ message: 'Deleting Users' });
});

module.exports = router;
