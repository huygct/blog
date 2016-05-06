/**
 * Created by thuynghi on 06/05/2016.
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
        state: 'app.appUser.userInfo',
        config: {
          url: '/user/info',
          templateUrl: 'app/core/user/info/userInfo.html',
          controller: 'UserInfoController',
          controllerAs: 'vm',
          title: 'User Information'
        }
      }
    ];
  }
})();