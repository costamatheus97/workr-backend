const express = require('express');

const jobs = require('./jobs');
const companies = require('./companies');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/jobs', jobs);
router.use('/companies', companies);

module.exports = router;
