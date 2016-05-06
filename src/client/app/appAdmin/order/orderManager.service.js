/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.order')
    .factory('orderManagerService', orderManagerService);

  orderManagerService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant', 'commonService',
    'coreService'];
  /* @ngInject */
  function orderManagerService($http, $q, exception, logger, appConstant, commonService,
                               coreService) {

    var api;
    var service = {};

    var cache = {
      alert: commonService.createAlert('danger', '', false),
      spinnerLoading: false
    };

    api = {
      getAllOrder: function () {
        var url = coreService.formatApi(appConstant.order.api.model);
        return $http.get(url);
      },
      updateStatusOrder: function (order, status) {
        var putData = {
          status: status
        };
        var url = coreService.formatApi(appConstant.order.api.model) + '/' + order.id;
        return $http.put(url, putData);
      },
      deleteOrder: function (order) {
        var url = coreService.formatApi(appConstant.order.api.model) + '/' + order.id;
        return $http.delete(url);
      }
    };

    service.api = api;
    service.cache = cache;

    return service;
  }
})();