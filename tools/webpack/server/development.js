const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { resolve, rules, plugins } = require('../base');

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
  target: 'node',
  entry: path.join(process.cwd(), 'src', 'server', 'index'),
  output: {
    path: path.join(process.cwd(), '.tmp'),
    filename: 'server.js',
  },
  resolve,
  plugins: [
    ...plugins,
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new NodemonPlugin(),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
  externals: NodeExternals(),
};

