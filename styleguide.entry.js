'use strict';
var docs = require("./blocks/form/field/docs.md");

document.querySelector('.markdown-body').innerHTML = docs;
    var styleguide = document.getElementById('styleguide'),

markup = require("./blocks/form/field/tpl.jade");

styleguide.innerHTML = markup;

    