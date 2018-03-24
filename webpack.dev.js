const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    lazy: false,
    overlay: {
      warnings: true,
    },
    progress: true,
    stats: { colors: true },
    proxy: {
      // proxy URLs to backend development server
      '/api': 'http://localhost:8000',
    },
  },
  // performance: {
  //   hints: 'warning', // enum
  //   maxAssetSize: 200000, // int (in bytes),
  //   maxEntrypointSize: 400000, // int (in bytes)
  //   assetFilter: function(assetFilename) {
  //     // Function predicate that provides asset filenames
  //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
  //   },
  // },
});
