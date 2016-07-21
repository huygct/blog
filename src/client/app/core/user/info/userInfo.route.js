/**
 * Created by thuynghi on 06/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'appConstant', '$rootScope'];
  /* @ngInject */
  function appRun(routerHelper, appConstant, $rootScope) {
    routerHelper.configureStates(getStates(appConstant, $rootScope));
  }

  getParamsURL.$inject = ['$stateParams'];
  function getParamsURL($stateParams) {
    return {
      mode: $stateParams.mode || '',
      facebook: $stateParams.facebook || ''
    }
  }

  function getStates(appConstant, $rootScope) {
    return [
      {
        state: 'app.appUser.userInfo',
        config: {
          url: '/user/info',
          templateUrl: 'app/core/user/info/userInfo.html',
          controller: 'UserInfoController',
          controllerAs: 'vm',
          title: 'User Information',
          data: {
            access: _.get($rootScope, 'facebookInfo.status') === 'connected' ? null : appConstant.USER_AUTH
          },
          params: {
            mode: '',
            facebook: ''
          },
          resolve: {
            paramsURL: getParamsURL
          }
        }
      }
    ];
  }
})();