/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('coreService', coreService);

  coreService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant'];
  /* @ngInject */
  function coreService($http, $q, exception, logger, appConstant) {
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
      return config.protocol + config.address + (config.port ? ':' + config.port : '') + api;
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

    return service;
  }
})();
