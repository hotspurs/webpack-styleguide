'use strict';

const express = require('express'),
      app = express(),
      webpack = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      path = require('path');


app.use('/', function(req, res, next){

  let dir = req.query.dir,
      block = req.query.block,
      compiler = webpack({
        entry: 'blocks/' + dir + '/' + block + '/index.js',
        output: {
          path : '/',
          filename: 'build.js',
          publicPath: '/build/'
        }
      }),
      middleware = webpackDevMiddleware(compiler, {
          publicPath: '/'
      });

  app.use(middleware);

  next();

});

app.get('/', (req, res, next) => {


  console.log('HERE', webpackDevMiddleware);

  res.sendFile('index.html', { root: __dirname });

});

app.listen(3000);
