/**
 * Created by thuynghi on 08/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'app.appUser.register',
        config: {
          url: '/register',
          templateUrl: 'app/core/register/register.html',
          controller: 'RegisterController',
          controllerAs: 'vm',
          title: 'Register'
        }
      }
    ];
  }
})();