/**
 * Created by thuynghi on 06/04/2016.
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('spinnerLoading', spinnerLoading);

  /* @ngInject */
  spinnerLoading.$inject = ['$http', '$templateCache'];
  function spinnerLoading ($http, $templateCache) {
    function linkFunc(scope, element, attrs, ctrl) {
      
    }

    return {
      restrict: 'A',
      scope: {
        spinnerLoading: '='
      },
      templateUrl: '',
      link: linkFunc
    };
  }
})();
