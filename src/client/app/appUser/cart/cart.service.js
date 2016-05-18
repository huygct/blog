/**
 * Created by thuynghi on 01/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.user.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['appConstant', 'localStorageService'];
  /* @ngInject */
  function cartService(appConstant, localStorageService) {

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
