const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({message: 'Listing Companies'});
});

router.post('/', (req, res, next) => {
  res.json({message: 'Creating Companies'});
});

router.put('/:id', (req, res, next) => {
  res.json({message: 'Editing Companies'});
});

router.delete('/:id', (req, res, next) => {
  res.json({message: 'Deleting Companies'});
});

module.exports = router;
