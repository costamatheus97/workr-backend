import { Request, Response, NextFunction } from 'express';

import express from 'express'

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'OK' })
});

export default router;
