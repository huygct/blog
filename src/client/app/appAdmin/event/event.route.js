/**
 * Created by Knightzoro on 4/23/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.event')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'app.appAdmin.event',
        config: {
          url: '/admin/event',
          templateUrl: 'app/appAdmin/event/event.html',
          controller: 'EventController',
          controllerAs: 'vm',
          title: 'Event'
        }
      }
    ];
  }
})();
