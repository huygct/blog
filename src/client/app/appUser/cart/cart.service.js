/**
 * Created by thuynghi on 01/04/2016.
 */
/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['$http', '$q', 'exception', 'logger', 'appConstant', 'localStorageService'];
  /* @ngInject */
  function cartService($http, $q, exception, logger, appConstant, localStorageService) {
    console.log('localStorageService ', localStorageService);

    var service = {};

    /**
     * save your cart into local storage
     */
    //var cart = localStorage.getItem(appConstant.YOUR_CART); // get your cart
    //cart = cart === null ? '[]' : cart;
    //var YOUR_CART = JSON.parse(cart);
    //
    //function addProductToCart() {
    //
    //}
    //
    //function removeProductOfCart() {
    //
    //}



    //service.YOUR_CART = YOUR_CART;

    return service;
  }
})();
