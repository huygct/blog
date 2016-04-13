/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('coreService', coreService);

  coreService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant', '$rootScope'];
  /* @ngInject */
  function coreService($http, $q, exception, logger, appConstant, $rootScope) {
    var service = {};

    /**
     * read env.json
     */
    function getEnv() {
      $http.get('env.json')
        .then(
          success,
          fail
      );
      function success(response) {
        service.env = response.data;
        return response.data;
      }
      function fail() {
        return exception.catcher('Read env.json fail...')
      }
    }

    function formatApi(api) {
      var config = service.env.server;
      return config.protocol + config.address + (config.port ? ':' + config.port : '') + '/' + api;
    }

    /**
     * save user into localStore
     * @param user
     */
    function saveCurrentUser(user) {
      $rootScope.currentUser = user;
      localStorage.setItem(appConstant.USER_APP, JSON.stringify(user));
    }

    /**
     * get user from localStore
     */
    function getCurrentUser() {
      var user = localStorage.getItem(appConstant.USER_APP);
      $rootScope.currentUser = JSON.parse(user) || {};
      return $rootScope.currentUser;
    }

    /**
     * remove current User
     */
    function removeCurrentUser() {
      $rootScope.currentUser = {};
      localStorage.removeItem(appConstant.USER_APP);
    }

    /**
     * Api
     */
    var api = {
      addUser: function (user) {
        return $http.post(formatApi(appConstant.core.api.addUser), user);
      }
    };

    service.api = api;
    service.getEnv = getEnv;
    service.formatApi = formatApi;
    service.saveCurrentUser = saveCurrentUser;
    service.getCurrentUser = getCurrentUser;
    service.removeCurrentUser = removeCurrentUser;

    return service;
  }
})();
