/**
 * Created by Huy Nghi on 4/17/2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('commonService', commonService);

  commonService.$inject = ['appConstant', 'coreService'];
  /* @ngInject */
  function commonService(appConstant, coreService) {

    var service = {};

    function createAlert(type, msg, show) {
      return {
        type: type || 'danger',
        msg: msg || type === 'danger' ? 'Failing...' : 'Success',
        show: show || false
      };
    }

    service.createAlert = createAlert;

    return service;
  }
})();
