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

    vm.backReadInfoUserView = function backReadInfoUserView() {
      vm.cache.view = 'readInfo';
      vm.cache.currentUser = {};
    };

    // update info user
    vm.applyNewInfo = function applyNewInfo(newUser) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      userInfoService.api.updateUser(newUser)
        .then(function (response) {
          var newUser = _.get(response, 'data');
          coreService.updateInfoUser(newUser);
          vm.cache.view = 'readInfo';
        })
        .catch(function () {
          alert.type = 'danger';
          alert.msg = 'Thực hiện không thành công!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    };
  }
})();