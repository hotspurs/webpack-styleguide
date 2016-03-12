'use strict';

var markup = require("./view.jade"),
    docs = require("./docs.md"),
    block = require('./link.js');

require('./style.styl');


document.getElementById('styleguide').innerHTML = markup;
document.getElementById('docs').innerHTML = docs;

block.init();
