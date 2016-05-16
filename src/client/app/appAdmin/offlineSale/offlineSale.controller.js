/**
 * Created by Huy Nghi on 5/15/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.setting')
    .controller('OfflineSaleController', OfflineSaleController);

  OfflineSaleController.$inject = ['$rootScope', '$scope', 'productManagerService', 'offlineSaleService'];
  function OfflineSaleController($rootScope, $scope, productManagerService, offlineSaleService) {
    $rootScope.nameApp = 'Offline Sale';

    var vm = this;

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
      return (sum + other).formatMoney(0, '.', ',');
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
      console.log('-- ', newOfflineSale);
    };

    vm.updateOfflineSale = function updateOfflineSale(upd) {

    };

    //------------------------------------------------
    vm.getProducts = getProducts;
    vm.getSumMoney = getSumMoney;

  }

})();
