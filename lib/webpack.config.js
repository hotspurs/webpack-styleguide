const webpack = require('webpack'),
      path = require('path');

module.exports = {
  entry: ['webpack-hot-middleware/client?reload=true', path.resolve(process.cwd(), 'styleguide.entry.js')],
  output: {
    path : path.resolve(process.cwd(), 'build'),
    filename: 'build.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.jade$/, loader: "raw!jade-html" },
      { test: /\.md$/, loader: "raw!markdown" },
      { test: /\.styl$/, loader: 'style!css!stylus?resolve url' },
      { test: /\.(jpg|png|svg|eot|woff|woff2)$/, loader: 'file?name=[path][name].[ext]'},
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolveLoader: {
    modulesDirectories: ['lib', 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
