const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const Dotenv = require('dotenv');

Dotenv.config();

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
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          modules: true,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
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
  resolve: { ...resolve, plugins: [
    new TsconfigPathsPlugin(),
  ]},
  optimization,
  plugins: [
    ...plugins,
    new DotenvWebpack(),
    new DotenvWebpack({ path: path.join(process.cwd(), '.env.client') }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new BrowserSyncPlugin(
      {
        open: false,
        host: 'localhost',
        port: parseInt(process.env.PORT_DEV, 10) || 3000,
        files: ['assets/**/*', 'src/views/**/*.ejs'],
        proxy: `http://localhost:${parseInt(process.env.PORT_HTTP, 10) || 3000}`,
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
