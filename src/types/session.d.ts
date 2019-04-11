import { Express } from 'express';

export type AppSession = Express.Session & {
  name?: string;
};

declare global {
  namespace Express {
    interface Request {
      session?: AppSession;
    }
  }
}
