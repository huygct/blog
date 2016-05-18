/**
 * Created by thuynghi on 08/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$q', 'dataservice', 'logger', '$scope', 'coreService', '$state'];
  /* @ngInject */
  function RegisterController($q, dataservice, logger, $scope, coreService, $state) {
    var vm = this;

    vm.alert = {
      type: 'danger',
      msg: 'Đăng ký thất bại... Vui lòng thực hiện lại...!!!',
      show: false
    };

    vm.register = function (user) {
      console.log('User: ', user);
      coreService.api.addUser(user)
        .then(function (response) {
          vm.alert.show = false;
          // save into localStore and $rootScope.currentUser
          coreService.saveCurrentUser(response.data);
          // go to Home Page
          $state.go('app.appUser.blog');
        }, function (error) {
          vm.alert.show = true;
        })
        .finally(function () {

        });
    };

    vm.closeAlert = function () {
      vm.alert.show = false;
    };
  }
})();
