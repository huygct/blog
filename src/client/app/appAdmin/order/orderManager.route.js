/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.order')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'appAdmin.orderManager',
        config: {
          url: '/admin/orderManager',
          templateUrl: 'app/appAdmin/order/orderManager.html',
          controller: 'OrderManagerController',
          controllerAs: 'vm',
          title: 'Order Manager'
        }
      }
    ];
  }
})();
