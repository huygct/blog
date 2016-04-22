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

  function getStates() {
    return [
      {
        state: 'app.appUser.product',
        config: {
          url: '/product/:productId',
          templateUrl: 'app/appUser/product/product.html',
          controller: 'ProductController',
          controllerAs: 'vm',
          title: 'Product'
        }
      }
    ];
  }
})();
