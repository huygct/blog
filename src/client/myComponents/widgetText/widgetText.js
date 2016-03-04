/**
 * Created by thuynghi on 04/03/2016.
 */
(function() {
  'use strict';

  angular
    .module('my-compoents')
    .directive('myWidgetText', myWidgetText);

  /* @ngInject */
  function myWidgetText () {
    var directive = {
      bindToController: true,
      controller: WidgetTextController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: false,
      templateUrl: 'myComponents/widgetText/widgetText.html',
      link: linkFunc
    };

    function linkFunc(scope, el, attr, ctrl) {

    }

    return directive;
  }

  /* @ngInject */
  WidgetTextController.$inject = [];
  function WidgetTextController() {
    var vm = this;

  }

})();
