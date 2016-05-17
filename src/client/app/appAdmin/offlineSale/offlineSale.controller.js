/**
 * Created by Huy Nghi on 5/15/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.setting')
    .controller('OfflineSaleController', OfflineSaleController);

  OfflineSaleController.$inject = ['$rootScope', '$scope', 'productManagerService', 'offlineSaleService', '$mdDialog'];
  function OfflineSaleController($rootScope, $scope, productManagerService, offlineSaleService, $mdDialog) {
    $rootScope.nameApp = 'Offline Sale';

    var vm = this;
    var originatorEv;

    vm.cache = offlineSaleService.cache;
    vm.products = [];

    vm.searchTerm = '';
    vm.clearSearchTerm = function() {
      vm.searchTerm = '';
    };
    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
//    $element.find('input').on('keydown', function(ev) {
//      ev.stopPropagation();
//    });

    function getProducts() {
      productManagerService.api.getAllProducts()
        .then(function (response) {
          vm.products = response.data;
        })
        .catch(function () {
          vm.products = [];
        })
    }

    function getOrderOfflineSale() {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      offlineSaleService.api.getAllOrderOffline()
        .then(function (response) {
          vm.orderOfflineSaleList = response.data;
        })
        .catch(function () {
          alert.type = 'danger';
          alert.msg = 'Lỗi thực hiện!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function() {
          vm.cache.spinnerLoading = false;
        })
    }

    function getSumMoney(selectedProducts, otherCost) {
      var sum = 0;
      var numberBuy = 1;
      var other = otherCost || 0;
      other = parseFloat(other);
      _.forEach(selectedProducts, function (p) {
        numberBuy = p.quantityWillBuy || 1;
        if(p.sale && p.sale > 0) {
          sum+=(p.sale * numberBuy);
        } else {
          sum+=(p.price * numberBuy);
        }
      });
      vm.cache.currentOfflineSale.sumMoney = (sum + other);
      return (sum + other);
    }

    vm.backToListOrderView = function() {
      vm.cache.currentView = offlineSaleService.getView.main;
      vm.cache.currentOfflineSale = {};
    };

    vm.goToAddOrderView = function goToAddOrderView() {
      vm.cache.currentView = offlineSaleService.getView.add;
      vm.cache.currentOfflineSale = {};
    };

    vm.goToEditOrderView = function goToEditOrderView(currentOfflineSale) {
      vm.cache.currentView = offlineSaleService.getView.edit;
      vm.cache.currentOfflineSale = currentOfflineSale;
    };

    vm.addOfflineSale = function addOfflineSale(newOfflineSale) {
      var productList = [];
      _.forEach(newOfflineSale.productList, function (product) {
        productList.push({
          id: product.id,
          name: product.name,
          quantityWillBuy: product.quantityWillBuy,
          price: product.price,
          sale: product.sale
        })
      });
      newOfflineSale.productList = productList;

      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      offlineSaleService.api.addOrderOffline(newOfflineSale)
        .then(function () {
          vm.backToListOrderView();
          getOrderOfflineSale();
          alert.type = 'success';
          alert.msg = 'Thêm thành công đơn hàng offline!!!';
          alert.show = true;
        })
        .catch(function () {
          alert.type = 'danger';
          alert.msg = 'Thêm đặc hàng offline thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function() {
          vm.cache.spinnerLoading = false;
        })
    };

    vm.openMenuChangeStatusOrder = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    vm.updateOfflineSale = function updateOfflineSale(newOfflineSale) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      offlineSaleService.api.updateOrderOffline(newOfflineSale)
        .then(function () {
          vm.backToListOrderView();
          getOrderOfflineSale();
          alert.type = 'success';
          alert.msg = 'Thay đổi đơn hàng thành công !!!';
          alert.show = true;
        })
        .catch(function () {
          alert.type = 'danger';
          alert.msg = 'Thực hiện thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function() {
          vm.cache.spinnerLoading = false;
        })
    };

    vm.deleteOfflineSale = function deleteOfflineSale(orderOfflineSale) {
      var confirm = $mdDialog.confirm()
        .title('Bạn muốn xoá đơn hàng này?')
        .textContent('Đơn hàng này sẽ bị xoá sau khi bấm ĐỒNG Ý.')
        .ariaLabel('change order')
        .targetEvent(originatorEv)
        .ok('Đồng ý!')
        .cancel('Hủy');
      $mdDialog.show(confirm).then(function() {
        var alert = vm.cache.alert;
        alert.show = false;
        vm.cache.spinnerLoading = true;
        offlineSaleService.api.deleteOrderOffline(orderOfflineSale.id)
          .then(function () {
            getOrderOfflineSale();
            alert.type = 'success';
            alert.msg = 'Xoá đơn hàng thành công !!!';
            alert.show = true;
          })
          .catch(function () {
            alert.type = 'danger';
            alert.msg = 'Thực hiện thất bại!!! Vui lòng thực hiện lại...';
            alert.show = true;
          })
          .finally(function() {
            vm.cache.spinnerLoading = false;
          })
      }, function() {

      });
      originatorEv = null;
    };

    //------------------------------------------------
    vm.getProducts = getProducts;
    vm.getSumMoney = getSumMoney;

    getOrderOfflineSale();

  }

})();
