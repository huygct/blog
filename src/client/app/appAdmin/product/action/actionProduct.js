/**
 * Created by thuynghi on 01/02/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .controller('ActionProductManagerController', ProductManagerController);

  ProductManagerController.$inject = ['$mdEditDialog', '$q', '$scope', '$timeout', 'logger',
    'layoutService', 'actionProductManagerService', 'appConstant'];
  /* @ngInject */
  function ProductManagerController($mdEditDialog, $q, $scope, $timeout, logger,
                             layoutService, actionProductManagerService, appConstant) {
    var vm = this;

    /**
     * ------------------------------------------------------------------
     */
    function addProduct() {
      actionProductService.api.addProduct(appConstant.product.api.addProduct, vm.currentProduct)
        .then(function (dataSuccess) {
          console.log('--- success: ', dataSuccess);
        }, function (error) {
          console.log('--- error: ', error);
        })
        .finally(function () {

        });
    }

    vm.addProduct = addProduct;

    /**
     * -------------------------------------------------------------------
     */


    function activate() {
      logger.info('Activated Add Product View');
    }

    var breadcrumb = [
      {'name': 'Home', url: '/'},
      {'name': 'Product', url: '/product'}
    ];

    activate();
  }
})();
