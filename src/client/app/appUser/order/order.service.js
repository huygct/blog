/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.order')
    .factory('orderService', orderService);

  orderService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function orderService($http, $q, exception, logger) {
    var service = {
    };

    return service;
  }
})();
