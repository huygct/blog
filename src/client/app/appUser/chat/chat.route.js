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

  /**
   * can chat if user have special code: "baconcho"
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
          title: 'Chat'
        }
      }
    ];
  }
})();
