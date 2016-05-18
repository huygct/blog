/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.cart')
    .controller('CartController', cartController);

  cartController.$inject = ['$mdDialog', 'localStorageService', 'appConstant', '$state'];
  /* @ngInject */
  function cartController($mdDialog, localStorageService, appConstant, $state) {

    var vm = this;

    var YOUR_CART_KEY = appConstant.YOUR_CART;
    var yourCart = localStorageService.get(YOUR_CART_KEY);

    vm.productList = yourCart;

    /**
     * show dialog to confirm before delete product into cart
     */
    vm.removeProductFromCart = function (item, $event) {
      var confirm = $mdDialog.confirm()
        .clickOutsideToClose(true)
        .title('Bạn không muốn mua sản phẩm này nữa?')
        .textContent('Sản phẩm này không còn trong giỏ hàng sau khi bạn chọn nút BỎ.')
        .ariaLabel('delete product')
        .targetEvent($event)
        .ok('Bỏ!')
        .cancel('Giữ lại');

      $mdDialog.show(confirm).then(function() {
        vm.productList = _.without(vm.productList, _.findWhere(vm.productList, {id: item.id}));
        localStorageService.set(YOUR_CART_KEY, vm.productList);
      }, function() {

      });
    };

    vm.sumMoney = function() {
      var sum = 0;
      var cost = 0;
      _.forEach(vm.productList, function (item) {
        cost = item.sale || item.price;
        sum += (cost * item.quantityWillBuy);
      });
      return sum.formatMoney(0, '.', ',');
    };

    vm.goToPageShowProducts = function () {
      $state.go('app.appUser.blog');
    };

    vm.goToOrder = function (productList) {
      var YOUR_CART_KEY = appConstant.YOUR_CART;
      localStorageService.set(YOUR_CART_KEY, productList);
      $state.go('app.appUser.order', {checkoutId: '95237041b02096bbdb38980f727e33c3local'});
    };

    //function activate() {
    //  logger.info('Activated Cart View');
    //}
    //
    //activate();
  }
})();