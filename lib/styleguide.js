'use strict';

const express = require('express'),
      webpack = require('webpack'),
      path = require('path'),
      fs = require('fs'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      scanDir = require('./scan-dir.js');

let middleware;

module.exports = function(app, config) {

  return function(req, res, next) {

    let dir = req.query.dir,
        block = req.query.block;
        
        fs.writeFile(path.resolve(process.cwd(), 'blocks/index.js'), 
          'require("webpack-styleguide-loader!./' + dir + '/' + block + '/index.js");', function(err) {

          if(middleware) {
            next();
          } else {

            let compiler = webpack(config);

            app.get('/styleguide', (req, res, next) => {

              scanDir(path.join(process.cwd(), '/blocks')).then((data) => {
                res.render('index.jade', { dirs: data.dir});
              });

            });

            app.use(express.static('public'));   

            middleware = webpackDevMiddleware(compiler, {
                publicPath: '/build/',
                watch: true
            });

            app.use(middleware);
            app.use(webpackHotMiddleware(compiler));
            next();            
          }


      });
  }

}





