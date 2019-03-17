const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { resolve, rules, plugins } = require('../base');

const tsconfigPath = path.join(process.cwd(), 'tools', 'tsconfig', 'server.production.json');
const appendRules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: tsconfigPath,
          transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
  resolve: { ...resolve, plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })] },
  optimization: {
    minimize: false,
  },
  externals: NodeExternals(),
  plugins: [
    ...plugins,
    new Dotenv(),
    new Dotenv({ path: path.join(process.cwd(), '.env.server') }),
    new MiniCssExtractPlugin({
      filename: 'THIS_FILE_IS_NOT_USE.css',
      chunkFilename: '[id].css',
    }),
    new ForkTsCheckerWebpackPlugin({ tsconfig: tsconfigPath }),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
};
