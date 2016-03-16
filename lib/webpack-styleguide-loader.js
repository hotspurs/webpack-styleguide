
function makeIndex(content){
  console.log('=>>>>', content);
  return new Promise(function (resolve, reject) {

    //resolve('true');

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

