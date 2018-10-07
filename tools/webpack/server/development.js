const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const { entry, output, resolve, rules, plugins, optimization } = require('../base');

const externals = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((tempMods, mod) => {
    tempMods[mod] = `commonjs ${mod}`;
    return tempMods;
  }, {});

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
  optimization,
  plugins: [
    ...plugins,
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new NodemonPlugin(),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
  externals,
};

