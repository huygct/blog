/**
 * Created by Knightzoro on 4/23/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.event')
    .controller('EventController', EventController);

  EventController.$inject = ['$http', 'appConstant', 'logger', 'eventService', '$scope', 'coreService',
    '$mdDialog', 'productManagerService'];

  /* @ngInject */
  function EventController($http, appConstant, logger, eventService, $scope, coreService,
                              $mdDialog, productManagerService) {
    var vm = this;
    vm.title = 'Event';
    vm.eventList = [];

    vm.cache = eventService.cache;

    /**
     * ------------------------------------------------------------------
     */
    function showAlertCannotDelete() {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Can\'t delete')
          .textContent('This events have exist product!!!')
          .ariaLabel('Can\'t delete')
          .ok('Ok')
      );
    }

    function loadEvent() {
      vm.eventList.length = 0;
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;

      eventService.api.getEventList()
        .then(function (response) {
          vm.eventList = response.data
        })
        .catch(function (error) {
          vm.eventList.length = 0;
          alert.type = 'danger';
          alert.msg = ' event thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    }

    /**
     * load product for action add and edit
     */
    function loadProduct(nextView) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      vm.cache.productInfo.productList = [];
      vm.cache.productInfo.productSelectList = [];
      productManagerService.api.getAllProducts()
        .then(function(response) {
          vm.cache.productInfo.productList = response.data;
          _.forEach(response.data, function (product) {
            if(product.event) {
              vm.cache.productInfo.productSelectList.push(product);
            }
          });
          vm.cache.currentView = nextView;
        })
        .catch(function (error) {
          alert.type = 'danger';
          alert.msg = 'Xảy ra lỗi khi thực hiện!!! Vui lòng thực hiện lại...';
          alert.show = true;
          vm.backToTableView();
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    }
    vm.toggle = function (item, productSelectList) {
      var idx = _.findIndex(productSelectList, function (product) {
                  return product.id === item.id;
                });
      if (idx > -1) {
        productSelectList.splice(idx, 1);
      }
      else {
        productSelectList.push(item);
      }
    };
    vm.exists = function (item, productSelectList) {
      var idx = _.findIndex(productSelectList, function (product) {
        return product.id === item.id;
      });
      return idx > -1;
    };

    vm.isIndeterminate = function() {
      return (vm.cache.productInfo.productSelectList.length !== 0 &&
      vm.cache.productInfo.productSelectList.length !== vm.cache.productInfo.productList.length);
    };
    vm.toggleAll = function() {
      if (vm.cache.productInfo.productSelectList.length === vm.cache.productInfo.productList.length) {
        vm.cache.productInfo.productSelectList = [];
      } else if (vm.cache.productInfo.productSelectList.length === 0 || vm.cache.productInfo.productSelectList.length > 0) {
        vm.cache.productInfo.productSelectList = vm.cache.productInfo.productList.slice(0);
      }
    };
    vm.isChecked = function() {
      console.log(vm.cache.productInfo.productSelectList );
      return vm.cache.productInfo.productSelectList.length === vm.cache.productInfo.productList.length;
    };

    /**
     * add Event
     */
    vm.goToAddEventView = function () {
      vm.cache.currentEvent = {};

      loadProduct(eventService.getView.add);
    };

    vm.addEvent = function(event) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      eventService.api.addEvent(event)
        .then(function (response) {
          // add success
          vm.backToTableView();
          alert.type = 'success';
          alert.msg = 'Đã thêm event thành công...';
          alert.show = true;
        })
        .catch(function (error) {
          // add error
          alert.type = 'danger';
          alert.msg = 'Thêm event thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    };

    /**
     * edit event
     */
    vm.goToEditEventView = function (event) {
      var currentEvent = angular.copy(event);
      vm.cache.currentEvent = {
        id: currentEvent.id,
        name: currentEvent.name,
        description:  currentEvent.description
      };

      loadProduct(eventService.getView.edit);
    };

    vm.updateEvent = function (event) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      eventService.api.updateEvent(event, event.id)
        .then(function (response) {
          // add success
          vm.backToTableView();
          alert.type = 'success';
          alert.msg = 'Đã thay đổi event thành công...';
          alert.show = true;
        })
        .catch(function (error) {
          // add error
          alert.type = 'danger';
          alert.msg = 'Thay đổi event thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    };
    //---------------------------------------------------------------------------------

    vm.backToTableView = function () {
      vm.cache.currentEvent = {};
      vm.cache.currentView = eventService.getView.main;
      activate();
    };

    vm.deleteRowCallback = function (event, $event) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Delete event:  ' + event.name)
        .textContent('Would you like to delete this event?')
        .ariaLabel('delete event')
        .targetEvent($event)
        .ok('Please delete it!')
        .cancel('Do not delete');
      $mdDialog.show(confirm).then(function () {
        if (event.products && event.products.length !== 0) {
          // can not remove because there is exist product --> show notify
          showAlertCannotDelete();
        } else {
          var alert = vm.cache.alert;
          alert.show = false;
          vm.cache.spinnerLoading = true;
          eventService.api.deleteEvent(event.id)
            .then(function (response) {
              alert.type = 'success';
              alert.msg = 'Đã xóa thành công...';
              alert.show = true;
            })
            .catch(function (error) {
              alert.type = 'danger';
              alert.msg = 'Đã xóa thất bại!!! Vui lòng thực hiện lại...';
              alert.show = true;
            })
            .finally(function () {
              vm.cache.spinnerLoading = false;
              loadEvent();
            })
        }
      }, function () {

      });
    };

    /**
     * upload image to server
     */
    vm.uploadImageToServer = function(imageSource) {
      vm.cache.file.loading = true;
      vm.cache.currentEvent.imageUrl = '';
      productManagerService.api.uploadImage(imageSource)
        .then(function(response){
          // get path of image
          var file = response.data.files;
          vm.cache.file.imageSource = {};
          vm.cache.currentEvent.imageUrl = file.path;
        })
        .catch(function() {
          vm.cache.currentEvent.imageUrl = '';
        })
        .finally(function () {
          vm.cache.file.loading = false;
        })
    };

    activate();

    function activate() {
      loadEvent();
      logger.info('Activated Event View');
    }
  }
})();