import { Express } from 'express';
import expressSession from 'express-session';

export function registSession(app: Express, isDevelopment: boolean) {
  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET_KEY || '__SET_SESSION_SECRET_KEY_TO_DOTENV__',
      resave: false,
      saveUninitialized: true,
      cookie: { httpOnly: !isDevelopment, maxAge: parseInt(process.env.COOKIE_MAX_AGE || '', 10) || 24 * 60 * 60 },
      // save server session info to redis
      // store: new RedisStore({
      //   host: config.redis.host,
      //   port: config.redis.port,
      //   db: config.redis.db,
      //   pass: config.redis.pass
      // }),
    }),
  );
}
