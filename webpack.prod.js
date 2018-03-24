const webpack = require('webpack');
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new CompressionPlugin({
      cache: true,
      algorithm: 'gzip',
    }),
    new MinifyPlugin(),
  ],
});
