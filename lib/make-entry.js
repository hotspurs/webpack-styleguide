const fs = require('fs'),
      path = require('path');

module.exports = function(dir, block, levels){
  
  
  isTechExist(levels[0], dir, block, 'styl').then((isExist)=>{

    console.log('=>>', isExist);

  }); 


  return str;

}

function isTechExist(level, dir, block, tech) {

  return new Promise(function (resolve, reject) {


    console.log('А что тут?', path.resolve( process.cwd() + `/${level}/${dir}/${block}/style.${tech}`));

    fs.access(path.resolve( process.cwd() + `${level}/${dir}/${block}/${block}.${tech}`), fs.F_OK, function(err){
      if(err){
        resolve(false)
      } else {
        resolve(true);
      }
    });

  });

}

function getRequireStringByParams(level, dir, block, tech) {
  return  `require("./${level}/${dir}/${block}/${block}.${tech}");`
}
