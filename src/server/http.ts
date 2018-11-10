import * as express from 'express';
import { Express } from 'express';
import compression from 'compression';
import winston from 'winston';
import expressWinston from 'express-winston';
import format from 'date-fns/format';

import { setApiRoutes } from './api';
import router from './routes/';

const isDevelopment = process.env.NODE_ENV === 'development' || false;
const port = parseInt(process.env.PORT_HTTP || '', 10) || 3000;

const logFormat = winston.format.printf(
  info => `${format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS')} ${info.level}: ${info.meta.res.statusCode} ${info.message}`,
);

async function initializeDevServer(expressApp: Express) {
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

async function main() {
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

export function runHttp() {
  main().then(() => console.log(`http: port[${port}]`));
}
