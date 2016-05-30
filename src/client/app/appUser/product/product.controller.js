/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.product')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$rootScope', '$location', 'productManagerService', 'productService',
    '$stateParams', 'coreService'];
  /* @ngInject */
  function ProductController($rootScope, $location, productManagerService, productService,
                             $stateParams, coreService) {
    var vm = this;

    var currentProductId = $stateParams.productId;
    var currentCategoryId = $stateParams.categoryId;

    vm.cache = productService.cache;
    vm.productsByCategoryId = [];

    function loadProductById(productId) {
      productManagerService.api.getProductById(productId)
        .then(function (response) {
          vm.currentProduct = response.data;
          vm.currentProduct.quantityWillBuy = 1;
          vm.cache.status = true;
          /**
           * Use to put to meta for facebook post link image
           * @type {{url: *, description: *, siteName: *, image: string}}
           */
          $rootScope.currentProduct = {
            url: $location.absUrl(),
            description: vm.currentProduct.description,
            siteName: vm.currentProduct.name,
            image: $location.protocol() + '://' + location.host + '/' + vm.currentProduct.imageUrl
          };
        })
        .catch(function () {
          vm.cache.status = false;
        });
    }

    function getProductByCategoryId(categoryId) {
      productManagerService.api.getProductByCategoryId(categoryId)
        .then(function (response) {
          vm.productsByCategoryId = _.filter(response.data, function(product) {
                                        return product.id !== currentProductId;
                                    });
          vm.cache.status = true;
        })
        .catch(function () {
          vm.productsByCategoryId = [];
          vm.cache.status = false;
        });
    }


    vm.openYourCard = coreService.openYourCard;


    function activate() {
      loadProductById(currentProductId);
      getProductByCategoryId(currentCategoryId);
      //logger.info('Activated Product View');
    }

    activate();
  }
})();
