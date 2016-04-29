/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.order')
    .factory('orderService', orderService);

  orderService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant', 'coreService'];
  /* @ngInject */
  function orderService($http, $q, exception, logger, appConstant, coreService) {
    var service = {};

    var api = {
      createOrder: function (order) {
        var url = coreService.formatApi(appConstant.order.api.model);
        return $http.post(url, order);
      }
    };

    service.api = api;

    return service;
  }
})();
