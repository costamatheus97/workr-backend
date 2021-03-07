import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

const router = Router();

import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

router.use(ensureAuthenticated);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const jobs = await context.read();

  //   res.json(jobs);
  // } catch (error) {
  //   next(error);
  // }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const { id } = req.params;
  //   const jobs = await context.findOne({ _id: id });

  //   res.json(jobs);
  // } catch (error) {
  //   next(error);
  // }
});

router.get('/company/:id', async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const { id } = req.params;
  //   const jobs = await context.read({ company_id: id });

  //   res.json(jobs);
  // } catch (error) {
  //   next(error);
  // }
});

// router.get('/company/:id', async (req, res, next) => {
//   const connection = Base.connect();
//   const baseInterface = new Base(connection);
//   const isConnected = await baseInterface.isConnected(connection);

//   if (isConnected) {
//     try {
//       const { id } = req.params;
//       const jobs = await context.read({ company_id: id });

//       res.json(jobs);
//     } catch (error) {
//       next(error);
//     }
//   }
// });

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  // const { id } = req.user;

  // const jobService = new CreateJobService();
  // try {
  //   await jobService.execute(id, req.body);

  //   res.json(req.body);
  // } catch (error) {
  //   next(error);
  // }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // const jobId = req.params.id;
  // const currentUserId = req.user.id;

  // try {
  //   const job = await context.findOne({ _id: jobId });

  //   if (job.company_id !== currentUserId) {
  //     throw new Error('Only the company that created the job can delete it!');
  //   }

  //   await context.delete({ _id: jobId });

  //   res.status(200).send();
  // } catch (error) {
  //   next(error);
  // }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // const removeCandidateService = new RemoveCandidateService();

  // const jobId = req.params.id;
  // const currentUserId = req.user.id;

  // try {
  //   await removeCandidateService.execute(jobId, currentUserId, req.body);

  //   res.status(200).send();
  // } catch (error) {
  //   next(error);
  // }
});

router.put('/candidate/:id', async (req: Request, res: Response, next: NextFunction) => {
  // const jobCandidateService = new JobCandidateService();

  // const jobId = req.params.id;
  // const currentUserId = req.user.id;

  // try {
  //   await jobCandidateService.execute(jobId, currentUserId);

  //   res.status(200).send();
  // } catch (error) {
  //   next(error);
  // }
});

export default router;
