const express = require('express');

const health = require('./health');
const jobs = require('./jobs');
const users = require('./users');
const companies = require('./companies');
const techs = require('./techs');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/health', health);
router.use('/jobs', jobs);
router.use('/users', users);
router.use('/companies', companies);
router.use('/techs', techs);

module.exports = router;
