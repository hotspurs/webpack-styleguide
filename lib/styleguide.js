'use strict';

const webpack = require('webpack'),
      path = require('path'),
      fs = require('fs'),
      webpackDevMiddleware = require('webpack-dev-middleware');


module.exports = function(app){

  return function(req, res, next){



    let dir = req.query.dir,
        block = req.query.block,
        middleware;

        fs.writeFile(path.resolve(process.cwd(), 'blocks/index.js'), 
          'require("./' + dir + '/' + block + '/index.js");', 
          function(err){
          let compiler = webpack({
            entry: path.resolve(process.cwd(), 'blocks/index.js'),
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
            }
          });

          middleware = webpackDevMiddleware(compiler, {
              publicPath: '/build/'
          });

          app.use(middleware);
          next();
      });

  }

}


