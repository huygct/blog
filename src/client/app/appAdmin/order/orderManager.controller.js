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
      var statusString = status ? 'Đã hoàn thành' : 'Chưa giao hàng';
      var confirm = $mdDialog.confirm()
        .title('Bạn muốn thay đổi trạng thái đơn hàng này?')
        .textContent('Trạng thái đơn hàng sẽ thay đổi là ' + '"' + statusString + '"' + ' sau khi bấm ĐỒNG Ý.')
        .ariaLabel('change order')
        .targetEvent(originatorEv)
        .ok('Đồng ý!')
        .cancel('Hủy');
      $mdDialog.show(confirm).then(function() {
        var alert = vm.cache.alert;
        alert.show = false;
        order.loading = true;
        orderManagerService.api.updateStatusOrder(order, status)
          .then(function (response) {
            order.status = _.get(response, 'data.status');
          })
          .catch(function () {
            alert.type = 'danger';
            alert.msg = 'Xảy ra lỗi khi thay đổi trang thái đơn hàng!!! Vui lòng thực hiện lại...';
            alert.show = true;
          })
          .finally(function () {
            order.loading = false;
          })
      }, function() {

      });
      originatorEv = null;
    };

    /**
     * delete order
     */
    vm.deleteOrder = function (order) {
      var confirm = $mdDialog.confirm()
        .title('Bạn muốn xóa đơn hàng này?')
        .textContent('Đơn hàng này sẽ bị xóa sau khi bấm ĐỒNG Ý.')
        .ariaLabel('delete order')
        .targetEvent(originatorEv)
        .ok('Đồng ý!')
        .cancel('Hủy');
      $mdDialog.show(confirm).then(function() {
        var alert = vm.cache.alert;
        alert.show = false;
        vm.cache.spinnerLoading = true;
        orderManagerService.api.deleteOrder(order)
          .then(function () {
            loadAllOrder();
          })
          .catch(function () {
            alert.type = 'danger';
            alert.msg = 'Xảy ra lỗi trong khi xóa đơn hàng!!! Vui lòng thực hiện lại...';
            alert.show = true;
          })
          .finally(function () {
            vm.cache.spinnerLoading = false;
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