/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('orderService', coreService);

  coreService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function coreService($http, $q, exception, logger) {
    var service = {
    };

    return service;
  }
})();
