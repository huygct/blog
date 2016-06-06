/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.product')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['productsByCategoryId', 'currentProduct', 'productService',
    'coreService'];
  /* @ngInject */
  function ProductController(productsByCategoryId, currentProduct, productService,
                             coreService) {
    var vm = this;

    vm.cache = productService.cache;
    vm.productsByCategoryId = productsByCategoryId;
    vm.currentProduct = currentProduct;

    vm.openYourCard = coreService.openYourCard;
  }
})();
