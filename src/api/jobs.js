const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({message: 'Listing Jobs'});
});

router.post('/', (req, res, next) => {
  res.json({message: 'Creating Jobs'});
});

router.put('/:id', (req, res, next) => {
  res.json({message: 'Editing Jobs'});
});

router.delete('/:id', (req, res, next) => {
  res.json({message: 'Deleting Jobs'});
});

module.exports = router;
