'use strict';

const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const environment = process.env.NODE_ENV || 'development';

const developmentConfig = environment === 'development'
  ? { devtool: 'source-map' }
  : {};

const webpackConfig = Object.assign(developmentConfig, {
  entry: [
    require.resolve('normalize.css/normalize.css'),
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(environment) },
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{ from: 'public/index.html', to: 'index.html' }]),
  ],
});

module.exports = webpackConfig;
