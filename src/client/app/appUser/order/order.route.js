/**
 * Created by thuynghi on 01/04/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.user.order')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  /**
   * when not login. checkoutId: 95237041b02096bbdb38980f727e33c3local
   */
  function getStates() {
    return [
      {
        state: 'app.appUser.order',
        config: {
          url: '/checkout/:checkoutId',
          templateUrl: 'app/appUser/order/order.html',
          controller: 'OrderController',
          controllerAs: 'vm',
          title: 'Order'
        }
      }
    ];
  }
})();
