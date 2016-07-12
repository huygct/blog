/**
 * Created by thuynghi on 09/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('Auth', authService);

  authService.$inject = ['$window', 'appConstant', 'localStorageService'];
  /* @ngInject */
  function authService($window, appConstant, localStorageService) {

    var service = {};

    function isAdminAuthenticated() {
      return $window.sessionStorage.getItem(appConstant.ADMIN_APP);
    }

    function isUserAuthenticated() {
      return localStorageService.get(appConstant.USER_APP);
    }

    function authorize(access) {
      if (access === appConstant.ADMIN_AUTH) {
        return isAdminAuthenticated();
      } else {
        if(access === appConstant.USER_AUTH) {
          return isUserAuthenticated();
        }
        return false;
      }
    }

    service.authorize = authorize;

    return service;
  }
})();