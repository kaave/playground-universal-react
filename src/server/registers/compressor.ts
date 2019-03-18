import { Express } from 'express';
import compression from 'compression';

export function registCompressor(app: Express) {
  app.use(compression({ level: parseInt(process.env.COMPRESS_LEVEL || '', 10) || 9 }));
}
