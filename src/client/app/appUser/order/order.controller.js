/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.order')
    .controller('OrderController', orderController);

  orderController.$inject = ['logger', '$scope', 'localStorageService', 'appConstant', '$mdDialog', '$mdMedia',
    '$state', 'orderService', 'coreService', '$rootScope'];
  /* @ngInject */
  function orderController(logger, $scope, localStorageService, appConstant, $mdDialog, $mdMedia,
                           $state, orderService, coreService, $rootScope) {
    var vm = this;

    vm.cache = orderService.cache;

    vm.user = vm.cache.user;
    vm.buyer = vm.cache.buyer;

    var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    var YOUR_CART_KEY = appConstant.YOUR_CART;
    var yourCart = localStorageService.get(YOUR_CART_KEY);
    /**
     * create your products
     */
    vm.yourProducts = yourCart;
    vm.moneyMustPay = 0;
    _.forEach(vm.yourProducts, function (item) {
      var cost = item.sale || item.price;
      vm.moneyMustPay += (item.quantityWillBuy * cost);
    });

    /**
     * login
     */
    vm.loginAccount = function(user) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      coreService.api.login(user)
        .then(function(response) {
          // login success
          coreService.saveCurrentUser(response.data);
          vm.changeLayoutToShowInfoOrder();
        })
        .catch(function(error) {
          if(error.status >= 400) {
            alert.msg = _.get(error, 'data.err');
            alert.type = 'danger';
            alert.show = true;
          }
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    };

    /**
     * Layout information.shipping.step2.html. show info order
     */
    vm.changeLayoutToShowInfoOrder = function () {
      vm.cache.currentLayout = orderService.layout.informationShipping;
    };

    /**
     * Layout affirmation.step1.html. fill info of order
     */
    vm.changeLayoutToFillInfoOrder = function () {
      vm.cache.currentLayout = orderService.layout.affirmation;
    };

    /**
     * go to cart to repair Order
     */
    vm.goToCart = function () {
      $state.go('app.appUser.cart', {cartID: '95237041b02096bbdb38980f727e33c3local'} );
    };

    /**
     * click Xác nhận đặc hàng
     */
    vm.confirmOrder = function ($event) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && customFullscreen;
      $mdDialog.show({
        controller: NotifyOrderDialogController,
        templateUrl: 'app/appUser/order/templateUrl/notifyOrderDialog.html',
        targetEvent: $event,
        //clickOutsideToClose:true,
        fullscreen: useFullScreen
      });

      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };

    /**
     * controller dialog config order
     */
    function NotifyOrderDialogController ($scope, $mdDialog) {
      $scope.spinnerLoading = true;
      var order = {};
      if(vm.cache.typeBuyer === 'member') {
        order.user = $rootScope.currentUser.user.id;
      } else {
        order = vm.buyer; // info buyer vang lai
      }
      order.sumMoney = vm.moneyMustPay; // add sum money

      var productList = [];
      if(vm.yourProducts.length !== 0) {
        _.forEach(vm.yourProducts, function (item) {
          productList
            .push({
              id: item.id,
              imageUrl: item.imageUrl,
              quantityWillBuy: item.quantityWillBuy,
              name: item.name,
              price: item.price,
              sale: item.sale
            });
        });
      }
      order.productList = productList; // add productList

      orderService.api.createOrder(order)
        .then(function () {
          $scope.title = 'Thông báo đặc hàng';
          $scope.content = 'Bạn đã đặc hàng thành công!!!';
          $scope.success = true;
          /**
           * delete cart when order success!
           */
          localStorageService.remove(YOUR_CART_KEY);
        })
        .catch(function () {
          $scope.title = 'Thông báo đặc hàng';
          $scope.content = 'Lỗi xảy ra... Vui lòng kiểm tra và thực hiện lại...! Cảm ơn!';
          $scope.success = false;
        })
        .finally(function () {
          $scope.spinnerLoading = false;
        });

      $scope.goToHome = function() {
        $state.go('app.appUser.blog');
        $mdDialog.hide();
      };

      $scope.actionFail = function() {
        $mdDialog.hide();
      };
    }

    //function activate() {
    //  logger.info('Activated Order View');
    //}
    //
    //activate();
  }
})();
