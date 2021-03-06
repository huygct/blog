/**
 * Created by thuynghi on 13/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('userInfoService', userInfoService);

  userInfoService.$inject = ['$http', 'commonService', 'exception', 'logger', 'coreService', 'appConstant'];
  /* @ngInject */
  function userInfoService($http, commonService, exception, logger, coreService, appConstant) {
    var service = {};

    var cache = {
      alert: commonService.createAlert('danger', '', false),
      view: 'readInfo',
      currentUser: {}
    };
    
    var api = {
      updateUser: function (newUser) {
        var url = coreService.formatApi(appConstant.user.api.model) + '/' + newUser.id;
        return $http.put(url, newUser);
      }
    };

    service.cache = cache;
    service.api = api;

    return service;
  }
})();
