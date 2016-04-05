/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .factory('productManagerService', productManagerService);

  productManagerService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant'];
  /* @ngInject */
  function productManagerService($http, $q, exception, logger, appConstant) {

    var api;
    var service = {};

    function getView() {
      return {
        main: {
          name: 'main',
          urlTpl: appConstant.product.urlTemplates.main
        },
        add: {
          name: 'add',
          urlTpl: appConstant.product.urlTemplates.add
        },
        edit: {
          name: 'edit',
          urlTpl: appConstant.product.urlTemplates.edit
        }
      };
    }

    var cache = {
      currentView: getView().main

    };

    api = {
      getProductList: function (url) {
        return $http.get(coreService.getApi(url));
      }
    };

    service.api = api;
    service.getView = getView();
    service.cache = cache;

    return service;
  }
})();
