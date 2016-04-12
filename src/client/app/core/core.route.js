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

  env.$inject = ['coreService'];
  function env(coreService){
    return coreService.getEnv();
  }

  function getStates() {
    return [
      {
        state: 'app',
        config: {
          abstract: true,
          templateUrl: 'app/core/app.html',
          controller: 'CoreController',
          controllerAs: 'vm',
          resolve: {
            env: env
          }
        }
      },
      {
        state: 'app.appUser',
        config: {
          abstract: true,
          templateUrl: 'app/core/user/appUser.html',
          controller: 'CoreUserController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'app.appAdmin',
        config: {
          abstract: true,
          templateUrl: 'app/core/admin/appAdmin.html',
          controller: 'CoreAdminController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'app.404',
        config: {
          url: '/404',
          templateUrl: 'app/core/404.html',
          title: '404'
        }
      }
    ];
  }
})();
