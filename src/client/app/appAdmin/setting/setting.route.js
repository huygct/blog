/**
 * Created by thuynghi on 09/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.setting')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'app.appAdmin.setting',
        config: {
          url: '/admin/setting',
          templateUrl: 'app/appAdmin/setting/setting.html',
          controller: 'SettingAdminController',
          controllerAs: 'vm',
          title: 'Setting'
        }
      }
    ];
  }

})();