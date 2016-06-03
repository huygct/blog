/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.product')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$rootScope', 'productsByCategoryId', 'currentProduct', 'productService',
    '$stateParams', 'coreService'];
  /* @ngInject */
  function ProductController($rootScope, productsByCategoryId, currentProduct, productService,
                             $stateParams, coreService) {
    var vm = this;

    var currentProductId = $stateParams.productId;
    var currentCategoryId = $stateParams.categoryId;

    vm.cache = productService.cache;
    vm.productsByCategoryId = productsByCategoryId;
    vm.currentProduct = currentProduct;






    vm.openYourCard = coreService.openYourCard;


    //function activate() {
    //  loadProductById(currentProductId);
    //  getProductByCategoryId(currentCategoryId);
      //logger.info('Activated Product View');
    //}

    //activate();
  }
})();
