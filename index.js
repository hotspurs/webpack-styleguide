'use strict';

const express = require('express'),
      app = express(),
      path = require('path'),
      webpackStyleguide = require('./lib/styleguide.js'),
      scanDir = require('./lib/scan-dir.js');

app.use('/styleguide', webpackStyleguide(app));

app.get('/styleguide', (req, res, next) => {

  scanDir(path.join(process.cwd(), '/blocks')).then(function(data){

    res.render('index.jade', { dirs: data.dir});
    
  });

});


app.listen(3000);
