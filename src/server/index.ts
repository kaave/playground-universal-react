import 'tslib';
import * as Dotenv from 'dotenv';
import * as express from 'express';
import { Express } from 'express';

import { setApiRoutes } from './api';
import { setGraphQLRoutes } from './graphql';
import router from './routes/';

Dotenv.load();

const isDevelopment = process.env.NODE_ENV === 'development' || false;
const port = process.env.PORT || 3000;

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
    console.log('dev mode');
    await initializeDevServer(app);
  } else {
    app.use(express.static('./build/client'));
  }

  app.set('view engine', 'ejs');
  app.set('views', 'src/views');

  app.use(express.static('./assets'));
  setApiRoutes(app);
  setGraphQLRoutes(app);

  app.use('*', router);

  app.listen(port);
}

main().then(() => console.log(`start: port[${port}]`));
