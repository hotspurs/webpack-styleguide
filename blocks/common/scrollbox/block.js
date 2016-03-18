import iScroll from 'iscroll';

module.exports = {
  init: (element, opts) => {
    opts = opts || {};
    
    if(element) {
      return new iScroll(element, opts)
    }
    
  }
}
