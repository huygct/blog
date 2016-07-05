/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('LoginDialogController', loginDialogController);

  loginDialogController.$inject = ['$state', '$uibModalInstance', '$window', 'appConstant', 'coreService'];
  /* @ngInject */
  function loginDialogController($state, $uibModalInstance, $window, appConstant, coreService) {
    var vm = this;

    vm.msgError = '';
    vm.loading = false;

    /**
     * login by facebook
     */
    vm.loginByFacebook = function () {
      coreService.facebook.loginByFacebook();
    };

    /**
     * login
     */
    vm.login = function (user) {
      vm.loading = true;
      vm.msgError = '';
      coreService.api.login(user)
        .then(function(response) {
          var type = _.get(response, 'data.type');
          if(type === 'admin') {
            $window.sessionStorage.setItem(appConstant.ADMIN_APP, JSON.stringify(response.data));
          } else {
            coreService.saveCurrentUser(response.data);
            vm.msgError = '';
          }
          $uibModalInstance.close(user);
        })
        .catch(function(error) {
          if(error.status >= 400) {
            vm.msgError = _.get(error, 'data.err');
          }
        })
        .finally(function () {
          vm.loading = false;
        });
    };
    /**
     * register
     */
    vm.goToRegister = function () {
      $state.go('app.appUser.register');
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
