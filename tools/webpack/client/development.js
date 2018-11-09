const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
