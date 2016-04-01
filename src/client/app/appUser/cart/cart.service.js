/**
 * Created by thuynghi on 01/04/2016.
 */
/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function cartService($http, $q, exception, logger) {
    var service = {
    };

    return service;
  }
})();
