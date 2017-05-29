const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './client/index'
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/'
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' }) }
    ]
  }
};
