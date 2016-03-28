/**
 * Created by thuynghi on 04/03/2016.
 */
(function () {
  'use strict';

  angular
    .module('my-compoents')
    .component('myWidgetText', {
      controller: WidgetTextController,
      bindings: {
        data: '<'
      },
      templateUrl: 'myComponents/widgetText/widgetText.html'
    });


  /* @ngInject */
  WidgetTextController.$inject = [];
  function WidgetTextController($scope, $element, $attrs) {

    var ctrl = this;

    console.log('-- ', ctrl.data);

  }

})();
