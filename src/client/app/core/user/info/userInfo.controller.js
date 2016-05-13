/**
 * Created by thuynghi on 06/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['$q', 'logger', '$rootScope', 'coreService', 'userInfoService'];
  /* @ngInject */
  function UserInfoController($q, logger, $rootScope, coreService, userInfoService) {
    var vm = this;

    vm.cache = userInfoService.cache;

    vm.goToViewChangeInfoUser = function goToViewChangeInfoUser() {
      vm.cache.view = 'writeInfo';
      vm.cache.currentUser = angular.copy(_.get($rootScope, 'currentUser.user'));
    };

    // update info user
    vm.applyNewInfo = function applyNewInfo(newUser) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      userInfoService.api.updateUser(newUser)
        .then(function () {

        })
        .catch(function () {

        })
        .finally(function () {

        });


      vm.cache.view = 'readInfo';

    }
  }
})();