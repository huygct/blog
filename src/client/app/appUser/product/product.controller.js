/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.product')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$q', 'logger', '$scope', 'productManagerService', 'productService',
    '$stateParams', 'coreService'];
  /* @ngInject */
  function ProductController($q, logger, $scope, productManagerService, productService,
                             $stateParams, coreService) {
    var vm = this;

    var currentProductId = $stateParams.productId;
    vm.cache = productService.cache;

    function loadProductById(productId) {
      productManagerService.api.getProductById(productId)
        .then(function (response) {
          vm.currentProduct = response.data;
          vm.currentProduct.quantityWillBuy = 1;
          vm.cache.status = true;
        })
        .catch(function (error) {
          vm.cache.status = false;
        })
    }

    vm.openYourCard = coreService.openYourCard;


    function activate() {
      loadProductById(currentProductId);
      logger.info('Activated Product View');
    }

    activate();
  }
})();
