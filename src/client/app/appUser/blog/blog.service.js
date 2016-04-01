/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.blog')
    .factory('blogService', blogService);

  blogService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function blogService($http, $q, exception, logger) {
    var service = {
    };

    return service;
  }
})();
