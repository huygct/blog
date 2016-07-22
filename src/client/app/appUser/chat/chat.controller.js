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

    var userId = _.get($rootScope, 'currentUser.user.id');
    if(!userId) {
      // thong bao
      return;
    }
    chatSocket.get("/chat/getUser?id=" + userId, function(data){
      console.log('was getten success', data);
      vm.cache.currentUser = data;
    });

  }
})();