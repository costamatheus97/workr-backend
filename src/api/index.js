const express = require('express');

const health = require('./health');
const jobs = require('./jobs');
const users = require('./users');
const companies = require('./companies');
const techs = require('./techs');
const sessions = require('./sessions');

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
router.use('/sessions', sessions);

module.exports = router;
