'use strict';

const express = require('express'),
      app = express(),
      webpackStyleguide = require('./lib/styleguide.js'),
      config = require('./lib/webpack.config.js'),
      levels = ['blocks.library', 'blocks'];

app.use('/styleguide', webpackStyleguide(app, config, levels));

app.listen(3000);
