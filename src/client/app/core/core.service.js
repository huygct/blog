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
     * Api
     */
    var api = {
      addUser: function (user) {
        return $http.post('http://localhost:1337/' + appConstant.core.api.addUser, user);
      }
    };

    service.api = api;

    return service;
  }
})();
