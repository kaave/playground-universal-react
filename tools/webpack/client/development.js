const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const conf = require('../../config');
const { entry, output, resolve, rules, plugins, optimization } = require('../base');

const appendRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
      },
    ],
  },
  { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
];

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: Object.entries(entry).reduce(
    (tmp, [key, value]) => {
      tmp[key] = [
        `webpack-dev-server/client?http://localhost:${conf.port.webpackDevServer}`,
        'webpack/hot/only-dev-server',
        ...(value instanceof Array ? value : [value]),
      ];
      return tmp;
    },
    {},
  ),
  output,
  resolve,
  optimization,
  plugins: [
    ...plugins,
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
  devServer: {
    publicPath: output.publicPath,
    contentBase: [conf.path.dest.development, conf.path.assets],
    port: conf.port.webpackDevServer,
  },
};
