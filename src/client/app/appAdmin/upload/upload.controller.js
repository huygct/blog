/**
 * Created by Knightzoro on 6/8/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.upload')
    .controller('UploadController', UploadController);

  UploadController.$inject = ['$rootScope', '$scope', '$http', 'uploadService', '$location'];
  function UploadController($rootScope, $scope, $http, uploadService, $location) {
    $rootScope.nameApp = 'Upload';

    var vm = this;
    vm.cache = uploadService.cache;
    vm.alert = vm.cache.alert;
    vm.photoList = [];
    var address = $location.protocol() + '://' + location.host + '/';

    var photos = [];

    $scope.fileNameChanged = function (ele) {
      vm.alert.show = false;
      if(ele.files.length > 6) {
        photos = [];
        vm.alert.type = 'danger';
        vm.alert.msg = 'Số lượng ảnh phải nhỏ hơn 6';
        vm.alert.show = true;
      } else {
        photos = ele.files;
      }
      $scope.$apply();
    };

    vm.fileNameChanged = function () {
      vm.alert.show = false;
      vm.cache.buttonLoading = true;
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
        updateToServer(response.data.files);
      }).catch(function () {
        vm.alert.type = 'danger';
        vm.alert.msg = 'Upload photos thất bại...';
        vm.alert.show = true;
        vm.cache.buttonLoading = false;
      });
    };

    vm.selectedPhoto = function(photo) {
      vm.cache.currentPhoto = angular.copy(photo);
      vm.cache.currentPhoto.urlPhoto = address + vm.cache.currentPhoto.path;
    };

    function updateToServer(photos) {
      // modify photos
      var photoList = [];
      _.forEach(photos, function (p) {
        photoList.push({
          name: p.filename,
          path: p.path,
          type: p.mimetype,
          destination: p.destination,
          size: p.size
        })
      });
      uploadService.api.addGallery(photoList)
        .then(function (response) {
          var newPhotos = response.data || [];
          _.forEach(newPhotos, function (photo) {
            vm.photoList.push(photo);
          });
        })
        .catch(function () {
          vm.alert.type = 'danger';
          vm.alert.msg = 'Upload photos thất bại...';
          vm.alert.show = true;
        })
        .finally(function () {
          vm.cache.buttonLoading = false;
        });
    }
    
    function getGallery() {
      vm.alert.show = false;
      vm.cache.spinnerLoading = true;
      uploadService.api.getGallery()
        .then(function (response) {
          vm.photoList = response.data || [];
        })
        .catch(function () {
          vm.photoList = [];
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