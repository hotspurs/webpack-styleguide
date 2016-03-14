var markup = require("./view.jade"),
    docs = require("./docs.md");

document.getElementById('styleguide').innerHTML = markup;
document.querySelector('.markdown-body').innerHTML = docs;
