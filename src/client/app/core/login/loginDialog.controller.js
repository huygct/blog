/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('LoginDialogController', loginDialogController);

  loginDialogController.$inject = ['$q', '$uibModalInstance', 'logger', '$scope'];
  /* @ngInject */
  function loginDialogController($q, $uibModalInstance, logger, $scope) {
    var vm = this;
    var user;

    vm.ok = function () {
      $uibModalInstance.close(user);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();