/**
 * Created by Knightzoro on 4/23/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.event')
    .controller('EventController', EventController);

  EventController.$inject = ['$rootScope', 'appConstant', 'logger', 'eventService', '$scope', 'coreService',
    '$mdDialog', 'productManagerService', '$mdMedia'];

  /* @ngInject */
  function EventController($rootScope, appConstant, logger, eventService, $scope, coreService,
                              $mdDialog, productManagerService, $mdMedia) {
    $rootScope.nameApp = 'Event Manager';
    var vm = this;
    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
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
          //.parent(angular.element(document.querySelector('#popupContainer')))
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
          alert.msg = 'Lấy event thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    }

    /**
     * add Event
     */
    vm.goToAddEventView = function () {
      vm.cache.currentEvent = {};

      vm.cache.currentView = eventService.getView.add;
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

      vm.cache.currentView = eventService.getView.edit;
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
     * assign event for products
     */
    vm.assignToProduct = function(event, $event) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: AssignProductController,
        templateUrl: 'app/appAdmin/event/templates/assignProductDialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        locals: {
          currentEvent: event
        }
      })
        .then(function(answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function() {
          vm.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        vm.customFullscreen = (wantsFullScreen === true);
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

    /**
     * controller for assign product
     */
    function AssignProductController($scope, $mdDialog, currentEvent) {
      $scope.currentEvent = currentEvent;
      $scope.alert = {
        show: false
      };
      $scope.spinnerLoading = true;

      $scope.productList = [];
      $scope.productListCanAction = []; // tat ca san pham, tru ra nhung sp da co event va event do khog phai event dang chon
      $scope.productSelectList = [];
      $scope.productSelectListOriginal = [];
      productManagerService.api.getAllProducts()
        .then(function(response) {
          $scope.productList = response.data;
          _.forEach(response.data, function (product) {
            if(product.event) {
              if(product.event.id === currentEvent.id) {
                $scope.productSelectList.push(product.id);
                $scope.productListCanAction.push(product.id);
              }
            } else {
              $scope.productListCanAction.push(product.id);
            }
          });
          $scope.productSelectListOriginal = angular.copy($scope.productSelectList);
        })
        .catch(function (error) {
          $scope.productList = [];
          $scope.productSelectList = [];
          $scope.productListCanAction = [];
          $scope.productSelectListOriginal = [];
          $scope.alert.type = 'danger';
          $scope.alert.msg = 'Thất bại khi thực thi!!! Vui lòng thực hiện lại...';
          $scope.alert.show = true;
        })
        .finally(function () {
          $scope.spinnerLoading = false;
        });

      // ----------------------------------------------------------------------------------------------------
      $scope.toggle = function (productId, productSelectList) {
        var idx = _.findIndex(productSelectList, function (id) {
          return id === productId;
        });
        if (idx > -1) {
          productSelectList.splice(idx, 1);
        }
        else {
          productSelectList.push(productId);
        }
      };
      $scope.exists = function (productId, productSelectList) {
        var idx = _.findIndex(productSelectList, function (id) {
          return id === productId;
        });
        return idx > -1;
      };

      $scope.isIndeterminate = function() {
        return ($scope.productSelectList.length !== 0 &&
        $scope.productSelectList.length !== $scope.productListCanAction.length);
      };
      $scope.toggleAll = function() {
        if ($scope.productSelectList.length === $scope.productListCanAction.length) {
          $scope.productSelectList.length = 0;
        } else {
          if ($scope.productSelectList.length === 0 || $scope.productSelectList.length > 0) {
            $scope.productSelectList.length = 0;
            _.forEach($scope.productListCanAction, function (productId) {
              $scope.productSelectList.push(productId);
            })
          }
        }
      };
      $scope.isChecked = function() {
        return $scope.productSelectList.length === $scope.productListCanAction.length;
      };
      // ----------------------------------------------------------------------------------------------------
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      // apply to product
      $scope.applyToDevice = function() {
        $scope.alert.show = false;
        $scope.spinnerLoading = true;
        var productListUnAssign = _.difference($scope.productSelectListOriginal, $scope.productSelectList);
        var productListAssign = _.difference($scope.productSelectList, $scope.productSelectListOriginal);
        var postData = {
          assignProductIds: productListAssign,
          unAssignProductIds: productListUnAssign,
          eventId: currentEvent.id
        };
        eventService.api.updateEventForProduct(postData)
          .then(function(response) {
            $mdDialog.hide();
            loadEvent();
          })
          .catch(function (error) {
            $scope.alert.type = 'danger';
            $scope.alert.msg = 'Thất bại khi thực thi!!! Vui lòng thực hiện lại...';
            $scope.alert.show = true;
          })
          .finally(function () {
            $scope.spinnerLoading = false;
          });
      };
    }

    function activate() {
      loadEvent();
      logger.info('Activated Event View');
    }

    activate();
  }
})();