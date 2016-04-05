/**
 * Created by thuynghi on 01/02/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .factory('actionProductManagerService', productManagerService);

  productManagerService.$inject = ['$http', 'exception', 'appConstant', 'coreService'];
  /* @ngInject */
  function productManagerService($http, exception, appConstant, coreService) {

    var api;
    var service = {};

    api = {
      addProduct: function (url, product) {
        return $http.post(coreService.getApi(url), product);
      }
    };

    service.api = api;

    return service;

  }
})();
