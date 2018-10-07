const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const conf = require('../config');

exports.resolve = {
  modules: ['node_modules'],
  extensions: ['json', '.tsx', '.ts', '.css', '.js'],
};

exports.rules = [
  {
    test: /\.css$/,
    use: [
      'style-loader',
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
  {
    test: /\.(txt|md|frag|vert|glsl)$/,
    use: 'raw-loader',
  },
];

exports.plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  }),
];

exports.optimization = {
  splitChunks: {
    name: 'vendor.bundle',
    chunks: 'initial',
  }
};
