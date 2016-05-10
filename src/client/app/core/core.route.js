(function () {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'appConstant'];
  /* @ngInject */
  function appRun(routerHelper, appConstant) {
    var otherwise = '/404';
    routerHelper.configureStates(getStates(appConstant), otherwise);
  }

  env.$inject = ['coreService'];
  function env(coreService){
    return coreService.getEnv();
  }

  function getStates(appConstant) {
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
          //data: {
          //  access: appConstant.admin
          //},
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
