/**
 * Created by thuynghi on 09/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('Auth', authService);

  authService.$inject = ['appConstant', 'localStorageService'];
  /* @ngInject */
  function authService(appConstant, localStorageService) {

    var service = {};

    var USER_APP = appConstant.USER_APP;

    function isAuthenticated() {
      return localStorageService.get(USER_APP);
    }

    function authorize(access) {
      if (access === appConstant.admin) {
        return isAuthenticated();
      } else {
        return false;
      }
    }

    service.authorize = authorize;

    return service;
  }
})();