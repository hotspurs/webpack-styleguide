'use strict';

const fs = require('fs'),
      path = require('path');

module.exports = function scanDir(srcpath){
  
  var dirObj = {};

  return new Promise(function (resolve, reject) {

    fs.readdir(srcpath, (err, files) => {

      if(err) throw err;

      var length;

      if(files){
        length = files.length;
      }
      
      if(length){
        var promises = [];

        for(let i = 0, nestedDir; i < length; i++){
          nestedDir = srcpath + '/'+files[i];

          var stat = fs.statSync(nestedDir);

          if(stat.isDirectory()){

            var promise = new Promise(function( resolve, reject ) {

                scanDir(nestedDir).then(function(data){
                  dirObj[files[i]] = data.dir;
                  resolve();
                });

              });

            promises.push(promise);

          }

        }

        Promise.all(promises).then(function(){
          resolve({dir: dirObj});
        });

      } else {

        resolve({dir: {} });
        
      }

    });

  });

}
