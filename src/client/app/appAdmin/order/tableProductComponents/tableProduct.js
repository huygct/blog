/**
 * Created by thuynghi on 05/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.cart')
    .component('tableProduct', {
      controller: TableProductController,
      bindings: {
        data: '<',
        option: '='
      },
      templateUrl: 'app/appAdmin/order/tableProductComponents/tableProduct.html'
    });

  TableProductController.$inject = [];
  function TableProductController() {
    var $ctrl = this;

  }

})();