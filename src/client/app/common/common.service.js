/**
 * Created by Huy Nghi on 4/17/2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('commonService', commonService);

  commonService.$inject = ['$http', 'appConstant', 'coreService'];
  /* @ngInject */
  function commonService($http, appConstant, coreService) {

    var service = {};

    function createAlert(type, msg, show) {
      return {
        type: type || 'danger',
        msg: msg || type === 'danger' ? 'Failing...' : 'Success',
        show: show || false
      };
    }

    /**
     * Add photo for Gallery model.
     * @param photos
     * @param type
     */
    function updateGallery(photos, type) {
      // modify photos
      var list = [];
      _.forEach(photos, function (p) {
        list.push({
          name: p.filename,
          path: p.path,
          type: type,
          destination: p.destination,
          size: p.size
        })
      });
      var url = coreService.formatApi('gallery/addFiles');
      return $http.post(url, list)
        .then(function (response) {
          return response.data || [];
        })
        .catch(function (error) {
          throw error;
        });
    }

    service.createAlert = createAlert;
    service.updateGallery = updateGallery;

    return service;
  }
})();
