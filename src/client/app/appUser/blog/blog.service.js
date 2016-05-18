/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.blog')
    .factory('blogService', blogService);

  blogService.$inject = ['$http', 'appConstant', 'coreService'];
  /* @ngInject */
  function blogService($http, appConstant, coreService) {
    var service = {};

    var cache = {
      status: true,
      defaultValue: {
        maxPageSize: 5,
        numberItemOfPage: 12,
        currentPage: 1,
        bigTotalItems: 120 // set again from server
      }

    };

    function getNumberProduct() {
      var url = coreService.formatApi(appConstant.product.api.getNumberProduct);
      $http.get(url)
        .then(function(response) {
          cache.defaultValue.bigTotalItems = response.data;

          cache.status = false;
        })
        .catch(function () {
          // fail
          cache.status = false; // notify fail network
        });
    }

    getNumberProduct();

    service.cache = cache;

    return service;
  }
})();
