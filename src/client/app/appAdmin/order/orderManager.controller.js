/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.order')
    .controller('OrderManagerController', OrderManagerController);

  OrderManagerController.$inject = ['$q', 'dataservice', 'logger', 'orderManagerService', '$scope', '$mdToast'];
  /* @ngInject */
  function OrderManagerController($q, dataservice, logger, orderManagerService, $scope, $mdToast) {
    var vm = this;
    vm.title = 'Category Manager';

    vm.selectedCategory = [];
    vm.cache = orderManagerService.cache;
    vm.orderList = [];

    /**
     * ------------------------------------------------------------------
     */
    function loadAllOrder () {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      orderManagerService.api.getAllOrder()
        .then(function (data) {
          vm.orderList = data;
          console.log('data ', data);
        }, function (error) {
          alert.type = 'danger';
          alert.msg = 'X?y ra l?i!!! Vui lòng th?c hi?n l?i...';
          alert.show = true;
          console.log(error);
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    }

    function activate() {
      loadAllOrder();
      logger.info('Activated Category View');
    }

    /**
     *
     */
    activate();
  }
})();