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

  function getStates() {
    return [
      {
        state: 'appUser.order',
        config: {
          url: '/checkout/:checkoutName',
          templateUrl: 'app/appUser/order/order.html',
          controller: 'OrderController',
          controllerAs: 'vm',
          title: 'Order'
        }
      }
    ];
  }
})();
