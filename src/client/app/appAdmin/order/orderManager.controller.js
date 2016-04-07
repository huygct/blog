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

    /**
     * ------------------------------------------------------------------
     */
    function loadData () {
      orderManagerService.api.getCategoryList("aa")
        .then(function (data) {
          vm.dataList = data;
        }, function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log('OK');
        });
    }

    activate();

    function activate() {
      loadData();
      logger.info('Activated Category View');
    }
  }
})();