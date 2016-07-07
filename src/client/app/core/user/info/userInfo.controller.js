/**
 * Created by thuynghi on 06/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['$scope', '$state', '$rootScope', 'coreService', 'userInfoService', 'paramsURL'];
  /* @ngInject */
  function UserInfoController($scope, $state, $rootScope, coreService, userInfoService, paramsURL) {
    var vm = this;

    vm.cache = userInfoService.cache;

    if(paramsURL.modeView && paramsURL.facebook === 'connected') {
      var alert = vm.cache.alert;
      vm.cache.view = paramsURL.modeView;
      vm.facebook = true;
      vm.cache.currentUser = {
        email: $rootScope.facebookInfo.email,
        name: $rootScope.facebookInfo.name
      };
      alert.type = 'danger';
      alert.msg = 'Để đăng nhập bằng Facebook. Vui lòng nhập đầy đủ thông tin của bạn vào bên dưới...';
      alert.show = true;
    }

    vm.goToViewChangeInfoUser = function goToViewChangeInfoUser() {
      vm.cache.view = 'writeInfo';
      vm.cache.currentUser = angular.copy(_.get($rootScope, 'currentUser.user'));
    };

    vm.backReadInfoUserView = function backReadInfoUserView() {
      vm.cache.view = 'readInfo';
      vm.cache.currentUser = {};
    };

    // destroy login by facebook
    vm.destroyAction = function destroyAction () {
      $state.go('app.appUser.blog');
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

    /**
     * when you login by facebook, clicking on button 'Xac Nhan' it make create new user with this information
     */
    vm.registerWithFacebook = function (facebookUser) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      coreService.api.addUser(facebookUser)
        .then(function (response) {
          // save into localStore and $rootScope.currentUser
          coreService.saveCurrentUser(response.data);
          // go to Home Page
          $state.go('app.appUser.blog');
        }, function (error) {
          alert.type = 'danger';
          alert.msg = 'Thực hiện không thành công!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {

        });
    };

    $scope.$watch('$destroy', function () {
      if($rootScope.facebook === 'connected') {
        coreService.facebook.logoutFacebook();
      }
    })
  }
})();