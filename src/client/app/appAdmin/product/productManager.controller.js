/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .controller('ProductManagerController', ProductManagerController);

  ProductManagerController.$inject = ['$q', 'dataservice', 'logger', 'productManagerService', '$scope', '$mdToast'];
  /* @ngInject */
  function ProductManagerController($q, dataservice, logger, productManagerService, $scope, $mdToast) {
    var vm = this;
    vm.title = 'Product Manager';

    vm.cache = productManagerService.cache;

    /**
     * ------------------------------------------------------------------
     */
    function loadData () {
      productManagerService.api.getProductList("aa")
        .then(function (data) {
          vm.dataList = data;
        }, function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log('OK');
        });
    }
    
    vm.addProduct = function(product) {
      console.log('Add Product action');
    };

    vm.goToAddProductView = function () {
      vm.cache.currentView = productManagerService.getView.add;
    };

    vm.backToTableView = function () {
      cache.currentView = productManagerService.getView.main
    };

    vm.selectedRowCallback = function (rows) {
      console.log('rows: ', rows);
    };

    activate();

    function activate() {
      loadData();
      logger.info('Activated Dashboard View');
    }
  }
})();
