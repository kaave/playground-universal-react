const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
          transpileOnly: true
        },
      },
    ],
  },
  {
    test: /\.css$/,
    use: [
      // 'isomorphic-style-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          modules: true,
        },
      },
      'postcss-loader',
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
  resolve: { ...resolve, plugins: [
    new TsconfigPathsPlugin({ configFile: tsconfigPath }),
  ]},
  optimization: {
    minimize: false
  },
  externals: NodeExternals(),
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: 'nouse.css',
      chunkFilename: '[id].css'
    }),
    new ForkTsCheckerWebpackPlugin({ tsconfig: tsconfigPath }),
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
};

