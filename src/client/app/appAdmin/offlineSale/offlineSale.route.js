/**
 * Created by Huy Nghi on 5/15/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.offlineSale')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'app.appAdmin.offlineSale',
        config: {
          url: '/admin/offlineSale',
          templateUrl: 'app/appAdmin/offlineSale/offlineSale.html',
          controller: 'OfflineSaleController',
          controllerAs: 'vm',
          title: 'Offline Sale'
        }
      }
    ];
  }

})();
