/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .controller('ProductManagerController', ProductManagerController);

  ProductManagerController.$inject = ['$q', 'dataservice', 'logger', 'productManagerService',
    '$scope', '$mdToast', 'appConstant'];
  /* @ngInject */
  function ProductManagerController($q, dataservice, logger, productManagerService,
                                    $scope, $mdToast, appConstant) {
    var vm = this;
    vm.title = 'Product Manager';

    vm.selectedProduct = [];
    vm.cache = productManagerService.cache;

    /**
     * ------------------------------------------------------------------
     */
    function loadData () {
      productManagerService.api.getProductList("aa")
        .then(function (data) {
          vm.productList = data;
        }, function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log('OK');
        });
    }

    // Editor options.
    vm.options = {
      language: 'vi',
      allowedContent: true,
      entities: false
    };

    // Called when the editor is completely ready.
    vm.onReady = function () {
      // ...
      console.log('finish description');
    };

    /**
     * add Product
     */
    vm.goToAddProductView = function () {
      vm.cache.currentView = productManagerService.getView.add;
      vm.currentProduct = {};
    };

    vm.addProduct = function(product) {
      product.description = vm.descriptionForProduct; // set description
      console.log('Add Product action', product);
    };

    /**
     * edit product
     */
    vm.goToEditProductView = function () {
      vm.currentProduct = angular.copy(vm.selectedProduct[0]);
      vm.cache.currentView = productManagerService.getView.add;
    };

    vm.updateProduct = function(product) {
      product.description = vm.descriptionForProduct; // set description
      console.log('Add Product action', product);
    };

    vm.backToTableView = function () {
      vm.currentProduct = {};
      vm.selectedProduct = [];
      vm.cache.currentView = productManagerService.getView.main
    };

    /**
     * upload image to server
     */
    vm.uploadImageToServer = function(imageSource) {
      console.log('==: ', imageSource);

      var url = appConstant.product.api.uploadImage;
      productManagerService.api.uploadImage(url, imageSource)
        .then(function(response){
          // get path of image
          var file = response.data.files;
        })
        .catch(function(error) {
          console.log('error Image: ', error);
        });
    };

    /**
     * callback from table directive
     * @param rows
     */
    vm.selectedRowCallback = function (rows) {
      vm.selectedProduct = rows;
      console.log('rows: ', rows);
    };

    activate();

    function activate() {
      loadData();
      logger.info('Activated Dashboard View');
    }
  }
})();
