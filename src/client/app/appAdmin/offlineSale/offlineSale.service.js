/**
 * Created by Huy Nghi on 5/15/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.offlineSale')
    .factory('offlineSaleService', offlineSaleService);

  offlineSaleService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant', 'commonService',
                            'coreService'];
  /* @ngInject */
  function offlineSaleService($http, $q, exception, logger, appConstant, commonService, coreService) {

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
      saveOrderOffline: function () {
        var url = coreService.formatApi(appConstant.setting.api.model);
        return $http.get(url);
      }
    };

    service.api = api;
    service.cache = cache;
    service.getView = getView();

    return service;
  }
})();
