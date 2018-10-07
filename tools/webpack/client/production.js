const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const LicenseInfoWebpackPlugin = require('license-info-webpack-plugin').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { entry, output, resolve, rules, plugins, optimization } = require('../base');

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
          transpileOnly: true
        },
      },
    ],
  },
];

module.exports = {
  mode: 'production',
  entry,
  output,
  resolve: { ...resolve, plugins: [
    new TsconfigPathsPlugin({ configFile: tsconfigPath }),
  ]},
  plugins: [
    ...plugins,
    new LicenseInfoWebpackPlugin({
      glob: '{LICENSE,license,License}*',
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
    })
  ],
  module: {
    rules: [...rules, ...appendRules],
  },
  optimization: {
    ...optimization,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: { comments: /^\**!|@preserve|@license|@cc_on/ },
        },
      }),
    ],
  },
};
