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
      templateUrl: 'app/zzzComponents/widgetText/widgetText.html'
    });


  /* @ngInject */
  WidgetTextController.$inject = ['$scope', '$state'];
  function WidgetTextController($scope, $state) {

    var ctrl = this;

    ctrl.callbackWhenClickCard = function(productId, category) {
      var categoryId = '';
      if(angular.isObject(category)) {
        categoryId = category.id;
      } else {
        categoryId = category;
      }
      $state.go('app.appUser.product', {productId: productId, categoryId: categoryId});
    };
  }

})();
