/**
 * Created by thuynghi on 19/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('app.user.chat')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  getYourName.$inject = ['$mdDialog', '$window', '$state', 'appConstant'];
  function getYourName ($mdDialog, $window, $state, appConstant) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Bạn tên gì?')
      .textContent('Tên của bạn sẽ được sử dụng để trò chuyện.')
      .placeholder('your name')
      .ariaLabel('tên của bạn')
      .ok('Đồng ý!')
      .cancel('Bỏ qua');
//    var account = null;
//    var json = $window.sessionStorage.getItem(appConstant.CHAT_APP);
//    if(json) {
//      account = JSON.parse(json);
//    }
    return $mdDialog.show(confirm)
        .then(function (result) {
          return result;
        }, function () {
          $state.go('app.appUser.blog');
        });
      }

  /**
   * can chat if user have special code: "nhungconcho"
   */
  function getStates() {
    return [
      {
        state: 'app.appUser.chat',
        config: {
          url: '/chat',
          templateUrl: 'app/appUser/chat/chat.html',
          controller: 'ChatController',
          controllerAs: 'vm',
          title: 'Chat',
          resolve: {
            yourName: getYourName
          }
        }
      }
    ];
  }
})();
