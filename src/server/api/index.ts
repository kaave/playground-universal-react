import { Application, Request, Response, Router } from 'express';

import users from './users';

const router = Router();

router.use('/users', users);

export function registApi(app: Application) {
  app.use('/api', router);
}
