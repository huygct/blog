/**
 * Created by Knightzoro on 3/30/16.
 */
(function () {
  'use strict';

  angular
    .module('app.user.cart')
    .controller('CartDialogController', CartDialogController);

  CartDialogController.$inject = ['$q', 'logger', '$scope', '$uibModalInstance', 'cartService',
    'appConstant', '$state', 'localStorageService', 'productForCart'];
  /* @ngInject */
  function CartDialogController($q, logger, $scope, $uibModalInstance, cartService,
                                appConstant, $state, localStorageService, productForCart) {
    var vm = this;

    var YOUR_CART_KEY = appConstant.YOUR_CART;
    /**
     * check your cart in localStorage
     */
    var yourCart = localStorageService.get(YOUR_CART_KEY);
    if(_.has(productForCart, 'id')) {
      if(yourCart && yourCart.length !== 0) {
        var productWasExist = _.findWhere(yourCart, {id: productForCart.id});
        if(productWasExist) {
          productWasExist.quantityWillBuy += productForCart.quantityWillBuy;
        } else {
          yourCart.push(productForCart);
        }
      } else {
        yourCart = [productForCart];
      }
    }

    vm.productList = yourCart;

    vm.removeProductFromCart = function (item) {
      vm.productList = _.without(vm.productList, _.findWhere(vm.productList, {id: item.id}));
    };

    vm.sumMoney = function() {
      var sum = 0;
      _.forEach(vm.productList, function (item) {
        sum += (item.price * item.quantityWillBuy);
      });
      return sum.formatMoney(0, '.', ',');
    };

    vm.goToPageShowProducts = function () {
      $uibModalInstance.close(vm.productList);
      $state.go('app.appUser.blog');
    };

    vm.goToOrder = function () {
      $uibModalInstance.close(vm.productList);
      $state.go('app.appUser.order', {'95237041b02096bbdb38980f727e33c3local'});
    };

    //vm.cancel = function () {
    //  $uibModalInstance.dismiss('cancel');
    //  console.log('-====================================================');
    //};
  }
})();
