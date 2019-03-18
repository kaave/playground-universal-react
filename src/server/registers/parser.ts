import { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export function registParser(app: Express) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
}
