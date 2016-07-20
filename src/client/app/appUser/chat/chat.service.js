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

    var tabs = [
      {title: 'All User', templateUrl: 'app/appUser/chat/templates/all-user.html'}
    ];

    var cache = {
      selectedTabIndex: 0,
      tabs: tabs
    };

    var functionList = {

    };

    service.cache = cache;
    service.functionList = functionList;

    return service;
  }
})();
