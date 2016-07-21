/**
 * Created by thuynghi on 19/07/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.chat')
    .controller('ChatController', chatController);

  chatController.$inject = ['$scope', '$rootScope', '$mdDialog', 'localStorageService', 'appConstant', '$state',
    'chatService'];
  /* @ngInject */
  function chatController($scope, $rootScope, $mdDialog, localStorageService, appConstant, $state,
                          chatService) {

    var vm = this;

    var functionList = chatService.functionList;
    vm.cache = chatService.cache;
    vm.cache.currentUser = angular.copy(_.get($rootScope, 'currentUser.user'));

    console.log('chatSocket: ', chatSocket);

    chatSocket.get("/chat/getUser?id=" + vm.cache.currentUser.id, function(data){
      console.log('was getten success', data);

    });

  }
})();