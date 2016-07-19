/**
 * Created by thuynghi on 19/07/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.chat')
    .factory('chatService', chatService);

  chatService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant', 'coreService',
    'commonService'];
  /* @ngInject */
  function chatService($http, $q, exception, logger, appConstant, coreService,
                        commonService) {
    var service = {};

    return service;
  }
})();
