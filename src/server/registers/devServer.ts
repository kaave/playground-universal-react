import { Express } from 'express';

export async function registDevServer(expressApp: Express) {
  const { default: webpack } = await import('webpack');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackDevMiddleware } = await import('webpack-dev-middleware');
  const { default: webpackClientConfig } = await import('../../../tools/webpack/client/development');

  const compiler = webpack(webpackClientConfig as any);
  expressApp.use(webpackHotMiddleware(compiler));
  expressApp.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackClientConfig.output.publicPath,
    }),
  );
}
