/**
 * Created by thuynghi on 07/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.order')
    .controller('OrderManagerController', OrderManagerController);

  OrderManagerController.$inject = ['$q', 'dataservice', 'logger', 'orderManagerService', '$scope', '$mdDialog'];
  /* @ngInject */
  function OrderManagerController($q, dataservice, logger, orderManagerService, $scope, $mdDialog) {
    var vm = this;
    vm.title = 'Category Manager';

    vm.selectedCategory = [];
    vm.cache = orderManagerService.cache;
    vm.orderList = [];

    /**
     * ------------------------------------------------------------------
     */
    var originatorEv;
    vm.openMenuChangeStatusOrder = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    vm.changeStatusOrder = function(order, status) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Bạn muốn thay đổi trạng thái đơn hàng này?')
        .textContent('Trạng thái đơn hàng sẽ thay đổi sau khi bấm ĐỒNG Ý.')
        .ariaLabel('change order')
        .targetEvent(originatorEv)
        .ok('Đồng ý!')
        .cancel('Hủy');
      $mdDialog.show(confirm).then(function() {
        var alert = vm.cache.alert;
        alert.show = false;
        orderManagerService.api.updateStatusOrder(order, status)
          .then(function (response) {
            loadAllOrder();
          })
          .catch(function () {
            alert.type = 'danger';
            alert.msg = 'Xảy ra lỗi!!! Vui lòng thực hiện lại...';
            alert.show = true;
          })
      }, function() {

      });
      originatorEv = null;
    };

    function loadAllOrder () {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      orderManagerService.api.getAllOrder()
        .then(function (response) {
          vm.orderList = response.data;
        }, function (error) {
          alert.type = 'danger';
          alert.msg = 'Xảy ra lỗi!!! Vui lòng thực hiện lại...';
          alert.show = true;
          console.log(error);
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    }

    function activate() {
      loadAllOrder();
      logger.info('Activated Category View');
    }

    /**
     *
     */
    activate();
  }
})();