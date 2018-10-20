import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json({
    key: '12345',
    name: 'John Doe',
    gender: 'man',
  });
});

export default router;
