/**
 * Created by Knightzoro on 6/8/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.upload')
    .controller('UploadController', UploadController);

  UploadController.$inject = ['$rootScope'];
  function UploadController($rootScope) {
    $rootScope.nameApp = 'Upload';

    var vm = this;

  }

})();