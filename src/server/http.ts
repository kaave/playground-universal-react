import * as express from 'express';
import compression from 'compression';
import winston from 'winston';
import expressWinston from 'express-winston';
import format from 'date-fns/format';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import { setApiRoutes } from './api';
import router from './routes/';

const isDevelopment = process.env.NODE_ENV === 'development' || false;
const port = parseInt(process.env.PORT_HTTP || '', 10) || 3000;

const logFormat = winston.format.printf(
  info => `${format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS')} ${info.level}: ${info.meta.res.statusCode} ${info.message}`,
);

async function initializeDevServer(expressApp: express.Express) {
  const { default: webpack } = await import('webpack');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackDevMiddleware } = await import('webpack-dev-middleware');
  const { default: webpackClientConfig } = await import('../../tools/webpack/client/development');

  const compiler = webpack(webpackClientConfig as any);
  expressApp.use(webpackHotMiddleware(compiler));
  expressApp.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackClientConfig.output.publicPath,
    }),
  );
}

export async function runHttp() {
  const app = express.default();

  if (isDevelopment) {
    await initializeDevServer(app);
    app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(logFormat),
      }),
    );
  } else {
    app.use(express.static('./build/client'));
    app.use(compression({ level: parseInt(process.env.COMPRESS_LEVEL || '', 10) || 9 }));
    app.use(
      expressWinston.logger({
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: `logs/${process.env.ACCESS_LOG || 'access.log'}` }),
        ],
        format: winston.format.combine(logFormat),
        level: 'info',
      }),
    );
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
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

  app.set('view engine', 'ejs');
  app.set('views', 'src/views');

  app.use(express.static('./assets'));
  setApiRoutes(app);

  app.use('*', router);

  if (!isDevelopment) {
    app.use(
      expressWinston.errorLogger({
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: `logs/${process.env.ERROR_LOG || 'error.log'}` }),
        ],
        format: winston.format.combine(logFormat),
      }),
    );
  }
  app.listen(port);
}
