/**
 * Created by thuynghi on 06/04/2016.
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('spinnerLoading', spinnerLoading);

  /* @ngInject */
  spinnerLoading.$inject = [];
  function spinnerLoading () {
    function linkFunc(scope, element, attrs, ctrl) {

    }

    return {
      restrict: 'A',
      transclude: true,
      scope: {
        spinnerLoading: '='
      },
      template: '<div>' +
                  '<div ng-cloak="" ng-transclude ng-hide="spinnerLoading"></div>' +
                  '<div layout="row" layout-sm="column" layout-align="space-around" ng-show="spinnerLoading">' +
                      '<md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
                  '</div>' +
                '</div>',
      link: linkFunc
    };
  }
})();
