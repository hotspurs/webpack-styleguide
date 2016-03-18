const fs = require('fs'),
      path = require('path');

module.exports = function(dir, block, levels){

  var str = "'use strict';\n",
      levelDocs = null,
      levelJs = null,
      levelTpl = null,
      levelAngular = null;

  levels.forEach(function(level){

    if( isTechExist(level, dir, block, 'styl') ){
      str += getRequireStringByParams(level, dir, block, 'styl');
      str += '\n';
    }

    if( isTechExist(level, dir, block, 'md') ){
      levelDocs = level;
    }

    if( isTechExist(level, dir, block, 'js') ){
      levelJs = level;
    }

    if( isTechExist(level, dir, block, 'jade') ){
      levelTpl = level;
    }

    if( isTechExist(level, dir, block, 'module.js') ){
      levelAngular = level
    }

  });

  if(levelDocs){

    str += `var docs = ${getRequireStringByParams(levelDocs, dir, block, 'md')}\n
document.querySelector('.markdown-body').innerHTML = docs;
    `;

  }

  if(levelTpl){
    str += `var styleguide = document.getElementById('styleguide'),\n
markup = ${getRequireStringByParams(levelDocs, dir, block, 'jade')}\n
styleguide.innerHTML = markup;

    `;
  }

  if( levelAngular && levelJs  ){
    str += `var module = ${getRequireStringByParams(levelDocs, dir, block, 'module.js')}\n
angular.bootstrap(styleguide, ['beta.${block}']);
    `;
  }

  if(levelJs && !levelAngular){
    str += `var block = ${getRequireStringByParams(levelDocs, dir, block, 'js')}\n
    block.init();
    `
  }



  return str;

}

function isTechExist(level, dir, block, tech) {
  var postfix = getPostfixByTech(tech);

  try {
      fs.accessSync(path.resolve( process.cwd() + `/${level}/${dir}/${block}/${postfix}.${tech}`), fs.F_OK);
      return true;
  } catch (e) {
      return false;
  }

}

function getRequireStringByParams(level, dir, block, tech) {
  var postfix = getPostfixByTech(tech);
  return  `require("./${level}/${dir}/${block}/${postfix}.${tech}");`
}

function getPostfixByTech(tech){

  var postfix = 'style';

  if(tech === 'md'){
    postfix = 'docs';
  } else if(tech === 'module.js'){
    postfix = 'block';
  } else if(tech === 'js'){
    postfix = 'block';
  } else if(tech === 'jade'){
    postfix = 'tpl';
  }

  return postfix;

}

