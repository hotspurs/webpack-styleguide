var markup = require("./view.jade"),
    docs = require("./docs.md");

document.getElementById('styleguide').innerHTML = markup;
document.getElementById('docs').innerHTML = docs;
