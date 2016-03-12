'use strict';

const express = require('express'),
      app = express(),
      path = require('path'),
      webpackStyleguide = require('./lib/styleguide.js');


app.use('/styleguide', webpackStyleguide(app));

app.get('/styleguide', (req, res, next) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(3000);
