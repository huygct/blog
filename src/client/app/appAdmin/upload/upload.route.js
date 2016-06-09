/**
 * Created by Knightzoro on 6/8/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.upload')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'app.appAdmin.upload',
        config: {
          url: '/admin/update',
          templateUrl: 'app/appAdmin/upload/upload.html',
          controller: 'UploadController',
          controllerAs: 'vm',
          title: 'Upload'
        }
      }
    ];
  }

})();