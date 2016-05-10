/**
 * Created by thuynghi on 09/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.setting')
    .controller('SettingAdminController', SettingAdminController);

  SettingAdminController.$inject = ['$rootScope', 'settingService'];
  function SettingAdminController($rootScope, settingService) {
    $rootScope.nameApp = 'Setting';

    var vm = this;

    vm.cache = settingService.cache;

    vm.setting = {};

    /**
     * get setting
     */
    function getSetting() {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      settingService.api.getSetting()
        .then(function (response) {
          vm.setting = response.data[0];
          console.log('-- ', vm.setting);
        })
        .catch(function () {
          alert.type = 'danger';
          alert.msg = 'Lỗi thực thi!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    }

    /**
     * update setting
     */
    function updateSetting(newLogoUrl, id) {
      var alert = vm.cache.alert;
      alert.show = false;

      var data = {
        logoUrl: newLogoUrl
      };
      settingService.api.updateSetting(data, id)
        .then(function (response) {
          vm.cache.file.imageSource = {};
          vm.setting.logoUrl = response.data.logoUrl;

          alert.type = 'success';
          alert.msg = 'Thay đổi logo thành công...';
          alert.show = true;
        })
        .catch(function () {
          vm.setting.logoUrl = '';
          alert.type = 'danger';
          alert.msg = 'Thay đổi logo thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.file.loading = false;
        });
    }

    /**
     * upload image to server
     */
    vm.uploadLogoToServer = function(imageSource) {
      var alert = vm.cache.alert;
      alert.show = false;

      vm.cache.file.loading = true;
      vm.setting.logoUrl = '';
      settingService.api.uploadLogo(imageSource)
        .then(function(response){
          var file = response.data.files;
          updateSetting(file.path, vm.setting.id);
        })
        .catch(function() {
          vm.setting.logoUrl = '';
          alert.type = 'danger';
          alert.msg = 'Thay đổi logo thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
          vm.cache.file.loading = false;
        });
    };

    getSetting();
  }

})();