/**
 * Created by thuynghi on 10/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.setting')
    .factory('settingService', settingService);

  settingService.$inject = ['$http', 'appConstant', 'commonService',
    'coreService'];
  /* @ngInject */
  function settingService($http, appConstant, commonService, coreService) {

    var service = {};

    var cache = {
      file: {
        myFile: {},
        imageSource: {},
        loading: false
      },
      alert: commonService.createAlert('danger', '', false),
      spinnerLoading: false
    };

    var api = {
      getSetting: function () {
        var url = coreService.formatApi(appConstant.setting.api.model);
        return $http.get(url);
      },
      updateSetting: function(data, id) {
        var url = coreService.formatApi(appConstant.setting.api.model) + '/' + id;
        return $http.put(url, data);
      },
      uploadLogo: function(imageSource) {
        var url = appConstant.setting.api.uploadLogo;
        //create form data object
        var fd = new FormData();
        fd.append('file', imageSource);
        //send the file / data to your server
        return $http.post(url, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
      }
    };

    service.api = api;
    service.cache = cache;

    return service;
  }
})();
