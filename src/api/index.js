const express = require('express');

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

router.use('/jobs', jobs);
router.use('/users', users);
router.use('/companies', companies);
router.use('/techs', techs);

module.exports = router;
