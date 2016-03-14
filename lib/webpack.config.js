const webpack = require('webpack'),
      path = require('path');

module.exports = {
  entry: ['webpack-hot-middleware/client?reload=true', path.resolve(process.cwd(), 'blocks/index.js')],
  output: {
    path : path.resolve(process.cwd(), 'build'),
    filename: 'build.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.jade$/, loader: "raw!jade-html-loader" },
      { test: /\.md$/, loader: "raw!markdown" },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
