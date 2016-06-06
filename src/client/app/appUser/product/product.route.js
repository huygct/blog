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

  getProductById.$inject = ['$rootScope', '$location', 'productManagerService', '$stateParams', 'env'];
  function getProductById($rootScope, $location, productManagerService, $stateParams, env) {
    var productId = $stateParams.productId;

    return productManagerService.api.getProductById(productId, env)
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

  getProductByCategoryId.$inject = ['productManagerService', '$stateParams', 'env'];
  function getProductByCategoryId(productManagerService, $stateParams, env) {
    var currentProductId = $stateParams.productId;
    var categoryId = $stateParams.categoryId;

    return productManagerService.api.getProductByCategoryId(categoryId, env)
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
            currentProduct: getProductById,
            productsByCategoryId: getProductByCategoryId
          }
        }
      }
    ];
  }
})();
