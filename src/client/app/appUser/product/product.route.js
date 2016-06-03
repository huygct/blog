/**
 * Created by Knightzoro on 3/30/16.
 */

(function() {
  'use strict';

  angular
    .module('app.user.product')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  loadProductById.$inject = ['$rootScope', '$location', 'productManagerService', '$stateParams'];
  function loadProductById($rootScope, $location, productManagerService, $stateParams) {
    var productId = $stateParams.productId;

    productManagerService.api.getProductById(productId)
      .then(function (response) {
        var currentProduct = response.data;
        currentProduct.quantityWillBuy = 1;
        /**
         * Use to put to meta for facebook post link image
         * @type {{url: *, description: *, siteName: *, image: string}}
         */
        $rootScope.currentProduct = {
          url: $location.absUrl(),
          description: currentProduct.description,
          siteName: currentProduct.name,
          image: $location.protocol() + '://' + location.host + '/' + currentProduct.imageUrl
        };

        return currentProduct;
      });
  }

  loadProductById.$inject = ['productManagerService', '$stateParams'];
  function getProductByCategoryId(productManagerService, $stateParams) {
    var currentProductId = $stateParams.productId;
    var categoryId = $stateParams.categoryId;

    productManagerService.api.getProductByCategoryId(categoryId)
      .then(function (response) {
        return _.filter(response.data, function(product) {
          return product.id !== currentProductId;
        });
      })
      .catch(function () {
        return [];
      });
  }

  /**
   * Default productId if not login: 95237041b02096bbdb38980f727e33c3local
   */
  function getStates() {
    return [
      {
        state: 'app.appUser.product',
        config: {
          url: '/product/:productId/:categoryId',
          templateUrl: 'app/appUser/product/product.html',
          controller: 'ProductController',
          controllerAs: 'vm',
          title: 'Product',
          resolve: {
            currentProduct: loadProductById,
            productsByCategoryId: getProductByCategoryId
          }
        }
      }
    ];
  }
})();
