const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'Listing Techs' });
});

router.post('/', (req, res, next) => {
  res.json({ message: 'Creating Techs' });
});

router.put('/:id', (req, res, next) => {
  res.json({ message: 'Editing Techs' });
});

router.delete('/:id', (req, res, next) => {
  res.json({ message: 'Deleting Techs' });
});

module.exports = router;
