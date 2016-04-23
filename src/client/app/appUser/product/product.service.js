/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.product')
    .factory('productService', productService);

  productService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function productService($http, $q, exception, logger) {
    var service = {};

    var cache = {
      status: true
    };

    service.cache = cache;

    return service;
  }
})();
