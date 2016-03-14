'use strict';

var markup = require("./view.jade"),
    docs = require("./docs.md"),
    block = require('./link.js');

require('./style.styl');


document.getElementById('styleguide').innerHTML = markup;
document.querySelector('.markdown-body').innerHTML = docs;

block.init();
