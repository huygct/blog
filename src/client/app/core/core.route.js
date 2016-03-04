(function () {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  /* @ngInject */
  function appRun(routerHelper) {
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [
      {
        state: 'appUser',
        config: {
          abstract: true,
          templateUrl: 'app/core/appUser.html',
          controller: 'CoreUserController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'appAdmin',
        config: {
          abstract: true,
          templateUrl: 'app/core/appAdmin.html',
          controller: 'CoreAdminController',
          controllerAs: 'vm'
        }
      },
      {
        state: '404',
        config: {
          url: '/404',
          templateUrl: 'app/core/404.html',
          title: '404'
        }
      }
    ];
  }
})();
