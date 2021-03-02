import  { Router } from 'express'

import health from './health'
import jobs from './jobs'
import users from './users'
import companies from './companies'
import techs from './techs'
import sessions from './sessions'

const router = Router();

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

export default router;
