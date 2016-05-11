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
          title: 'Product'
        }
      }
    ];
  }
})();
