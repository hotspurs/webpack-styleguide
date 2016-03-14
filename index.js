'use strict';

const express = require('express'),
      app = express(),
      webpackStyleguide = require('./lib/styleguide.js'),
      config = require('./lib/webpack.config.js');

app.use('/styleguide', webpackStyleguide(app, config));

app.listen(3000);
