(function () {
  'use strict';

  angular
    .module('app.admin.dashboard')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'app.appAdmin.dashboard',
        config: {
          url: '/admin/dashboard',
          templateUrl: 'app/appAdmin/dashboard/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'vm',
          title: 'dashboard'
        }
      }
    ];
  }
})();
