/**
 * Created by thuynghi on 09/06/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.upload')
    .factory('uploadService', uploadService);

  uploadService.$inject = ['$http', 'commonService', 'coreService'];
  /* @ngInject */
  function uploadService($http, commonService, coreService) {

    var service = {};

    var cache = {
      alert: commonService.createAlert('danger', '', false),
      spinnerLoading: false
    };

    var api = {
      addGallery: function(photos){
        var url = coreService.formatApi('gallery');
        return $http.post(url, photos);
      },
      getGallery: function() {
        var url = coreService.formatApi('gallery');
        return $http.get(url);
      }
    };

    service.api = api;
    service.cache = cache;

    return service;
  }
})();
