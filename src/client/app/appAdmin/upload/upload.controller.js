/**
 * Created by Knightzoro on 6/8/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.upload')
    .controller('UploadController', UploadController);

  UploadController.$inject = ['$rootScope', '$scope', '$http', 'uploadService'];
  function UploadController($rootScope, $scope, $http, uploadService) {
    $rootScope.nameApp = 'Upload';

    var vm = this;
    vm.cache = uploadService.cache;
    vm.alert = vm.cache.alert;
    vm.photoList = [];

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
          console.log('-- ', response.data);
        })
        .catch(function () {

        })
        .finally(function () {
          vm.cache.buttonLoading = false;
        });
    }
    
    function getGallery() {
      vm.cache.spinnerLoading = true;
      uploadService.api.getGallery()
        .then(function (response) {
          var files = response.data;
          _.forEach(files, function (file) {
            vm.photoList.push({
              thumb: 'images/thumbs/' + file.name,
              img: 'images/' + file.name,
              description: file.description || ''
            })
          })
        })
        .catch(function () {

        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });

    }

    getGallery();

  }

})();