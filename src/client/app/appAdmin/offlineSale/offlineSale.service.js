/**
 * Created by Huy Nghi on 5/15/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.offlineSale')
    .factory('offlineSaleService', offlineSaleService);

  offlineSaleService.$inject = ['$http', 'appConstant', 'commonService',
                            'coreService'];
  /* @ngInject */
  function offlineSaleService($http, appConstant, commonService, coreService) {

    var service = {};

    function getView() {
      return {
        main: {
          name: 'main',
          urlTpl: appConstant.offlineSale.urlTemplates.main
        },
        add: {
          name: 'add',
          urlTpl: appConstant.offlineSale.urlTemplates.add
        },
        edit: {
          name: 'edit',
          urlTpl: appConstant.offlineSale.urlTemplates.edit
        }
      };
    }

    var cache = {
      currentView: getView().main,
      alert: commonService.createAlert('danger', '', false),
      spinnerLoading: false,
      currentOfflineSale: {}
    };

    var api = {
      getAllOrderOffline: function () {
        var url = coreService.formatApi(appConstant.offlineSale.api.model);
        return $http.get(url);
      },
      addOrderOffline: function (newOfflineSale) {
        var url = coreService.formatApi(appConstant.offlineSale.api.model);
        return $http.post(url, newOfflineSale);
      },
      updateOrderOffline: function (newOfflineSale) {
        var url = coreService.formatApi(appConstant.offlineSale.api.model) + '/' + newOfflineSale.id;
        return $http.put(url, newOfflineSale);
      },
      deleteOrderOffline: function (id) {
        var url = coreService.formatApi(appConstant.offlineSale.api.model) + '/' + id;
        return $http.delete(url);
      }
    };

    service.api = api;
    service.cache = cache;
    service.getView = getView();

    return service;
  }
})();
