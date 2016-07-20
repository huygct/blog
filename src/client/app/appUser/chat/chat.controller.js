/**
 * Created by thuynghi on 19/07/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.chat')
    .controller('ChatController', chatController);

  chatController.$inject = ['$scope', '$mdDialog', 'localStorageService', 'appConstant', '$state',
    'chatService'];
  /* @ngInject */
  function chatController($scope, $mdDialog, localStorageService, appConstant, $state,
                          chatService) {

    var vm = this;

    var functionList = chatService.functionList;
    vm.cache = chatService.cache;

  }
})();