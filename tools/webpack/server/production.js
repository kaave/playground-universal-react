const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

const { resolve, rules, plugins } = require('../base');

const appendRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: path.join(process.cwd(), 'tools', 'tsconfig', 'server.production.json'),
          transpileOnly: true
        },
      },
    ],
  },
];

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.join(process.cwd(), 'src', 'server', 'index'),
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: 'server.js',
  },
  resolve,
  optimization: {
    minimize: false
  },
  externals: NodeExternals(),
  plugins: [
    ...plugins,
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
};

