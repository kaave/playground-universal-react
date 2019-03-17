const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { resolve, rules, plugins } = require('../base');

const appendRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      'cache-loader',
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'isomorphic-style-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'css-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'postcss-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: true },
      },
    ],
  },
  { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
];

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
  entry: path.join(process.cwd(), 'src', 'server', 'index'),
  output: {
    path: path.join(process.cwd(), '.tmp'),
    filename: 'server.js',
  },
  resolve: { ...resolve, plugins: [new TsconfigPathsPlugin()] },
  plugins: [
    ...plugins,
    new Dotenv(),
    new Dotenv({ path: path.join(process.cwd(), '.env.server') }),
    new webpack.NamedModulesPlugin(),
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
    new ForkTsCheckerWebpackPlugin(),
    new NodemonPlugin({
      nodeArgs: ['--inspect'],
      script: path.join(process.cwd(), '.tmp', 'server.js'),
    }),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
  externals: NodeExternals(),
};
