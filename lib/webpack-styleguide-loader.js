
function makeIndex(content){
  
  return new Promise(function (resolve, reject) {

    resolve(content);

  });
}

module.exports = function(content) {

  console.log('HERE', content);

  var callback = this.async();
  
  makeIndex(content).then((result) => {
    callback(null, result)
  }, (err) => {
    callback(err);
  });

}

