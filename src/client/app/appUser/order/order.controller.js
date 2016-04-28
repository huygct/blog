/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.order')
    .controller('OrderController', orderController);

  orderController.$inject = ['$q', 'logger', '$scope', 'localStorageService', 'appConstant',
    '$state'];
  /* @ngInject */
  function orderController($q, logger, $scope, localStorageService, appConstant,
                           $state) {
    var vm = this;

    var YOUR_CART_KEY = appConstant.YOUR_CART;
    var yourCart = localStorageService.get(YOUR_CART_KEY);

    vm.typeBuyer = 'member';
    vm.user = {};
    vm.buyer = {};
    vm.views = {
      affirmation: 'app/appUser/order/templateUrl/affirmation.step1.html',
      informationShipping: 'app/appUser/order/templateUrl/information.shipping.step2.html'
    };

    vm.currentView = vm.views.affirmation;

    /**
     * create your products
     */
    vm.yourProducts = yourCart;
    vm.moneyMustPay = 0;
    _.forEach(vm.yourProducts, function (item) {
      vm.moneyMustPay += (item.price * item.quantityWillBuy);
    });

    vm.authenticate = function() {
      console.log('aaaa');
    };

    /**
     * go to cart to repair Order
     */
    vm.goToCart = function () {
      $state.go('app.appUser.cart', {cartID: '95237041b02096bbdb38980f727e33c3local'} );
    };

    function activate() {
      logger.info('Activated Order View');
    }

    activate();
  }
})();