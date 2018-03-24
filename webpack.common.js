const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const embedFileSizeThreshold = 244;

module.exports = {
  entry: {
    main: './src/index',
  },
  target: 'web',
  context: __dirname,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Fancy Cars - Homepage',
      description: 'Welcome to Fancy Cars website. We sell fancy cars!',
      hash: true,
      chunks: ['main'],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      filename: 'index.html',
      template: './src/html/homepage.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
        include: [new RegExp(path.join(__dirname, 'src'))],
        enforce: 'pre',
      },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.mp4/,
        loader: 'url?limit=' + embedFileSizeThreshold + '&mimetype=video/mp4',
      },
      {
        test: /\.svg/,
        loader:
          'url?limit=' + embedFileSizeThreshold + '&mimetype=image/svg+xml',
      },
      {
        test: /\.png$/,
        loader: 'url?limit=' + embedFileSizeThreshold + '&mimetype=image/png',
      },
      {
        test: /\.jpg/,
        loader: 'url?limit=' + embedFileSizeThreshold + '&mimetype=image/jpeg',
      },
      {
        test: /\.gif/,
        loader: 'url?limit=' + embedFileSizeThreshold + '&mimetype=image/gif',
      },
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=' + embedFileSizeThreshold,
      },
    ],
  },
  stats: {
    colors: true,
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         minChunks: 1,
  //         name: 'libs',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
};
