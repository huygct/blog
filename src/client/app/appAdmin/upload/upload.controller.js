/**
 * Created by Knightzoro on 6/8/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.upload')
    .controller('UploadController', UploadController);

  UploadController.$inject = ['$rootScope', '$scope', '$http', 'uploadService', '$location', 'commonService'];
  function UploadController($rootScope, $scope, $http, uploadService, $location, commonService) {
    $rootScope.nameApp = 'Upload';

    var vm = this;
    vm.cache = uploadService.cache;
    vm.alert = vm.cache.alert;

    vm.photoList = [];
    vm.iconList = [];

    vm.disableButtonUploadIcon = true;
    vm.disableButtonUploadImageNormal = true;
    vm.disableButtonDeleteIcon = true;
    vm.disableButtonDeleteImage = true;

    var address = $location.protocol() + '://' + location.host + '/';

    var photos = [];
    var icons = [];

    $scope.photosChanged = function (ele) {
      vm.alert.show = false;
      if(ele.files.length > 6 || ele.files.length < 1) {
        photos = [];
        vm.alert.type = 'danger';
        vm.alert.msg = 'Số lượng ảnh phải lớn hơn 1 hoặc nhỏ hơn 6';
        vm.alert.show = true;
        vm.disableButtonUploadImageNormal = true;
      } else {
        photos = ele.files;
        vm.disableButtonUploadImageNormal = false;
      }
      $scope.$apply();
    };

    $scope.iconsChanged = function (ele) {
      vm.alert.show = false;
      if(ele.files.length > 6) {
        icons = [];
        vm.alert.type = 'danger';
        vm.alert.msg = 'Số lượng ảnh phải lớn hơn 1 hoặc nhỏ hơn 6';
        vm.alert.show = true;
        vm.disableButtonUploadIcon = true;
      } else {
        icons = ele.files;
        vm.disableButtonUploadIcon = false;
      }
      $scope.$apply();
    };

    vm.uploadPhoto = function () {
      vm.alert.show = false;
      vm.cache.buttonPhotoLoading = true;
      var url = '/api/uploadPhotos';
      //create form data object
      var fd = new FormData();
      _.forEach(photos, function (photo) {
        fd.append('photos', photo);
      });
      //send the file / data to your server
      return $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function (response) {
        vm.alert.type = 'success';
        vm.alert.msg = 'Upload photos thành công!...';
        vm.alert.show = true;
        updateToServer(response.data.files, 'normal');
      }).catch(function () {
        vm.alert.type = 'danger';
        vm.alert.msg = 'Upload photos thất bại...';
        vm.alert.show = true;
        vm.cache.buttonPhotoLoading = false;
      });
    };

    vm.uploadIcon = function () {
      vm.alert.show = false;
      vm.cache.buttonIconLoading = true;
      var url = '/api/uploadIcons';
      //create form data object
      var fd = new FormData();
      _.forEach(icons, function (icon) {
        fd.append('photos', icon);
      });
      //send the file / data to your server
      return $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(function (response) {
        vm.alert.type = 'success';
        vm.alert.msg = 'Upload icons thành công!...';
        vm.alert.show = true;
        updateToServer(response.data.files, 'icon');
      }).catch(function () {
        vm.alert.type = 'danger';
        vm.alert.msg = 'Upload icons thất bại...';
        vm.alert.show = true;
        vm.cache.buttonIconLoading = false;
      });
    };

    vm.selectedPhoto = function(photo) {
      vm.disableButtonDeleteImage = false;
      vm.cache.currentPhoto = angular.copy(photo);
      vm.cache.currentPhoto.urlPhoto = address + 'images'+ vm.cache.currentPhoto.name;
    };

    vm.selectedIcon = function(icon) {
      vm.disableButtonDeleteIcon = false;
      vm.cache.currentIcon = angular.copy(icon);
      vm.cache.currentIcon.urlPhoto = address + 'images/icons/' + vm.cache.currentIcon.name;
    };

    vm.deleteGallery = function(id, type) {
      vm.alert.show = false;
      if(type === 'icon') {
        vm.cache.buttonDeleteIconLoading = true;
        vm.disableButtonDeleteIcon = false;
      } else {
        vm.cache.buttonDeleteImageLoading = true;
        vm.disableButtonDeleteImage = false;
      }
      vm.cache.spinnerLoading = true;
      uploadService.api.deleteGallery(id)
        .then(function (response) {
          $http.delete('api/deleteFile/' + response.data.name)
            .then(function () {
              vm.alert.type = 'success';
              vm.alert.msg = 'Đã xóa xong file: ' + response.data.name + ' ...';
              vm.alert.show = true;
              getGallery();
            })
            .catch(function () {
              vm.alert.type = 'danger';
              vm.alert.msg = 'Thực hiện xóa thất bại...';
              vm.alert.show = true;
            }).finally(function () {
              vm.cache.spinnerLoading = false;
              if(type === 'icon') {
                vm.cache.buttonDeleteIconLoading = false;
                vm.disableButtonDeleteIcon = true;
              } else {
                vm.cache.buttonDeleteImageLoading = false;
                vm.disableButtonDeleteImage = true;
              }
            });
        })
        .catch(function () {
          vm.alert.type = 'danger';
          vm.alert.msg = 'Thực hiện xóa thất bại...';
          vm.alert.show = true;
        })
    };

    function updateToServer(photos, type) {
      commonService.updateGallery(photos, type)
        .then(function (newPhotos) {
          var currentList = type === 'normal' ? vm.photoList : vm.iconList;
          _.forEach(newPhotos, function (photo) {
            if(!_.find(currentList, function (p) { return p.name === photo.name})) {
              currentList.push(photo);
            }
          });
        })
        .catch(function () {
          vm.alert.type = 'danger';
          vm.alert.msg = 'Upload photos thất bại...';
          vm.alert.show = true;
        })
        .finally(function () {
          if (type === 'normal') {
            vm.cache.buttonPhotoLoading = false;
          } else {
            vm.cache.buttonIconLoading = false;
          }
        });
    }

    function getGallery() {
      vm.photoList = [];
      vm.iconList = [];
      vm.alert.show = false;
      vm.cache.spinnerLoading = true;
      uploadService.api.getGallery()
        .then(function (response) {
          var list = response.data || [];
          _.forEach(list, function (p) {
            if(p.type === 'normal') {
              vm.photoList.push(p);
            } else {
              vm.iconList.push(p);
            }
          })
        })
        .catch(function () {
          vm.photoList = [];
          vm.iconList = [];
          vm.alert.type = 'danger';
          vm.alert.msg = 'Lấy thông tin gallery thất bại...';
          vm.alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    }

    getGallery();

  }

})();