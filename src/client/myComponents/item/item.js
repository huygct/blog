(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('myItem', item);

  /* @ngInject */
  function item () {
    var directive = {
      bindToController: true,
      controller: ItemController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: false,
      templateUrl: 'myComponents/item/item.html',
      link: linkFunc
    };

    function linkFunc(scope, el, attr, ctrl) {

    }

    return directive;
  }

  /* @ngInject */
  ItemController.$inject = [];
  function ItemController() {
    var vm = this;

  }

})();
