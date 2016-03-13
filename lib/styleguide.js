'use strict';

const webpack = require('webpack'),
      path = require('path'),
      fs = require('fs'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware');

let middleware;

module.exports = function(app){

  return function(req, res, next){

    let dir = req.query.dir,
        block = req.query.block;
        

        fs.writeFile(path.resolve(process.cwd(), 'blocks/index.js'), 
          'require("./' + dir + '/' + block + '/index.js");', 
          function(err){

          if(middleware){

            middleware.invalidate();

            middleware.waitUntilValid(function(){
              next();
            });
            
            return;
          }

          let compiler = webpack({
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
          });
          
          middleware = webpackDevMiddleware(compiler, {
              publicPath: '/build/'
          });

          app.use(middleware);
          app.use(webpackHotMiddleware(compiler));
          next();
      });

  }
}



