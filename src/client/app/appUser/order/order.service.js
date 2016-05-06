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

    var layout = {
      affirmation: 'app/appUser/order/templateUrl/affirmation.step1.html',
      informationShipping: 'app/appUser/order/templateUrl/information.shipping.step2.html'
    };

    var cache = {
      currentLayout: layout.affirmation
    };

    var api = {
      createOrder: function (order) {
        var url = coreService.formatApi(appConstant.order.api.model);
        return $http.post(url, order);
      }
    };

    service.api = api;
    service.cache = cache;
    service.layout = layout;

    return service;
  }
})();
