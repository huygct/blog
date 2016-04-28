/**
 * Created by thuynghi on 01/04/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.user.cart')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  /**
   * not login = don't have user: callID: 95237041b02096bbdb38980f727e33c3local
   */
  function getStates() {
    return [
      {
        state: 'app.appUser.cart',
        config: {
          url: '/cart/:cartID',
          templateUrl: 'app/appUser/cart/cart.html',
          controller: 'CartController',
          controllerAs: 'vm',
          title: 'Cart'
        }
      }
    ];
  }
})();
