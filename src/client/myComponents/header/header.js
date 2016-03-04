/**
 * Created by thuynghi on 02/03/2016.
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('myHeader', header);

  /* @ngInject */
  function header () {
    var directive = {
      bindToController: true,
      controller: HeaderController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: false,
      templateUrl: 'myComponents/header/header.html',
      link: linkFunc
    };

    function linkFunc(scope, el, attr, ctrl) {

    }

    return directive;
  }

  /* @ngInject */
  HeaderController.$inject = [];
  function HeaderController() {
    var vm = this;

  }

})();
