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

    var currentProduct = {};
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

    /**
     * add Product
     */
    vm.goToAddProductView = function () {
      vm.cache.currentView = productManagerService.getView.add;
    };
    
    vm.addProduct = function(product) {
      console.log('Add Product action');
    };

    /**
     * edit product
     */
    vm.goToEditProductView = function () {
      vm.currentProduct = currentProduct;
      vm.cache.currentView = productManagerService.getView.add;
    };

    vm.backToTableView = function () {
      vm.cache.currentView = productManagerService.getView.main
    };

    /**
     * callback from table directive
     * @param rows
     */
    vm.selectedRowCallback = function (rows) {
      currentProduct = rows;
      console.log('rows: ', rows);
    };

    activate();

    function activate() {
      loadData();
      logger.info('Activated Dashboard View');
    }
  }
})();
