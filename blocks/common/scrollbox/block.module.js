import angular from 'angular';

import block from './block.js';

angular
.module('beta.scrollbox', [])
.directive('scrollbox', () => {

  return {

    restrict:'A',
    link: (scope, elements, attrs) => {
      var opts = attrs.scrollbox ? JSON.parse(attrs.scrollbox) : {}

      block.init(elements[0], opts);

    }

  }

});
