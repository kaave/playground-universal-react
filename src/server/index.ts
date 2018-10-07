import 'tslib';
import * as Dotenv from 'dotenv';
import * as express from 'express';
import { Express } from 'express';

Dotenv.load();

function initializeDevServer(expressApp: Express) {
  const webpack = require('webpack');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackClientConfig = require('../../tools/webpack/client/development');

  const compiler = webpack(webpackClientConfig as any);
  expressApp.use(webpackHotMiddleware(compiler));
  expressApp.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackClientConfig.output.publicPath,
    }),
  );
}

const isDevelopment = process.env.NODE_ENV === 'development' || false;
const port = process.env.PORT || 3000;
const app = express.default();

if (isDevelopment) {
  console.log('dev mode');
  initializeDevServer(app);
}

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.static('./assets'));

app.use('*', (req, res) => {
  res.render('./index.ejs');
});

app.listen(port, () => console.log(`start: port[${port}]`));
