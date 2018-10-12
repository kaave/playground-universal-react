const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const conf = require('../../config');
const { resolve, rules, plugins, optimization } = require('../base');

const appendRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      'cache-loader',
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
const publicPath = '/';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: [
      'webpack-hot-middleware/client',
      path.join(process.cwd(), 'src', 'entryPoints', 'index'),
    ],
  },
  output: {
    path: path.join(process.cwd(), '.tmp', 'client'),
    filename: '[name].js',
    publicPath,
  },
  resolve,
  optimization,
  plugins: [
    ...plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new BrowserSyncPlugin(
      {
        open: false,
        host: 'localhost',
        port: 3000,
        files: ['assets/**/*', 'src/views/**/*.ejs'],
        proxy: 'http://localhost:8880',
      },
      {
        reload: false,
      },
    ),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
};
