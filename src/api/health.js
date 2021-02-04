const express = require('express');

const router = express.Router();


router.get('/', async (req, res, next) => {
  res.json({ status: 'UP' })
});

module.exports = router;
