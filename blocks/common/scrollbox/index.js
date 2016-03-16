'use strict';

import angular from 'angular';

var markup = require("./tpl.jade"),
    docs = require("./readme.md"),
    block = require('./block.js'),
    module = require('./module.js');

require('./style.styl');

var styleguide = document.getElementById('styleguide');

styleguide.innerHTML = markup;
document.querySelector('.markdown-body').innerHTML = docs;

angular.bootstrap(styleguide, ['beta.scrollbox']);
