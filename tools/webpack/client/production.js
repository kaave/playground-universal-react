const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { GenerateSW } = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { resolve, rules, plugins, optimization } = require('../base');

const tsconfigPath = path.join(process.cwd(), 'tools', 'tsconfig', 'client.production.json');
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

const publicPath = '/';
const usePlugins = [
  ...plugins,
  new Dotenv(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: tsconfigPath,
  }),
  new GenerateSW(),
];

if (process.env.IS_ANALYZE) {
  usePlugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: 'production',
  entry: {
    index: path.join(process.cwd(), 'src', 'entryPoints', 'index'),
  },
  output: {
    path: path.join(process.cwd(), 'build', 'client'),
    filename: '[name].js',
    publicPath,
  },
  resolve: { ...resolve, plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })] },
  plugins: usePlugins,
  module: {
    rules: [...rules, ...appendRules],
  },
  optimization: {
    ...optimization,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: {
          filename: 'licenses.txt',
        },
        terserOptions: {
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/,
          },
        },
      }),
    ],
  },
};
