/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .controller('ProductManagerController', ProductManagerController);

  ProductManagerController.$inject = ['$q', 'dataservice', 'logger', 'productManagerService',
    '$scope', '$mdToast', 'appConstant', 'categoryService'];
  /* @ngInject */
  function ProductManagerController($q, dataservice, logger, productManagerService,
                                    $scope, $mdToast, appConstant, categoryService) {
    var vm = this;
    vm.title = 'Product Manager';

    vm.selectedProduct = [];
    vm.cache = productManagerService.cache;
    var productList = [];

    // Editor options.
    vm.optionsEditor = {
      language: 'vi',
      allowedContent: true,
      entities: false
    };

    /**
     * ------------------------------------------------------------------
     */
    function loadData (page, pageSize) {
      var offset = (page - 1) * pageSize;
      var objectPost = {
        offset: offset.toString(),
        limit: pageSize.toString()
      };

      var alert = vm.cache.alert;
      alert.show = false;

      return productManagerService.api.getProductWithPage(objectPost)
        .then(function(result) {
          productList = result.data;
          return {
            results: productList.data,
            totalResultCount: productList.total
          }
        })
        .catch(function (error) {
          alert.type = 'danger';
          alert.msg = 'Lấy thông tin product thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
          return {
            results: [],
            totalResultCount: 0
          }
        })
    }

    /**
     * call from html
     */
    vm.paginatorCallback = loadData;

    // Called when the editor is completely ready.
    vm.onReady = function () {
      // ...
      console.log('finish description');
    };

    // load category list
    vm.loadCategory = function() {
      categoryService.api.getCategoryList()
        .then(function (response) {
          vm.cache.categoryList = response.data;
        })
        .catch(function (error) {

        })
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

      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;

      productManagerService.api.addProduct(product)
        .then(function (response) {
          // add success
          vm.backToTableView();
          alert.type = 'success';
          alert.msg = 'Đã thêm product thành công...';
          alert.show = true;
        })
        .catch(function (error) {
          // add error
          alert.type = 'danger';
          alert.msg = 'Thêm product thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    };

    /**
     * edit product
     */
    vm.goToEditProductView = function () {
      vm.currentProduct = angular.copy(vm.selectedProduct[0]);
      if(vm.currentProduct.hasOwnProperty('createdAt')) {
        delete vm.currentProduct['createdAt'];
      }
      if(vm.currentProduct.hasOwnProperty('updatedAt')) {
        delete vm.currentProduct['updatedAt'];
      }
      vm.cache.currentView = productManagerService.getView.edit;
    };

    vm.updateProduct = function(product) {
      product.description = vm.descriptionForProduct; // set description

      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      productManagerService.api.updateProduct(product, product.id)
        .then(function (response) {
          // add success
          vm.backToTableView();
          alert.type = 'success';
          alert.msg = 'Đã thay đổi product thành công...';
          alert.show = true;
        })
        .catch(function (error) {
          // add error
          alert.type = 'danger';
          alert.msg = 'Thay đổi product thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
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
      productManagerService.api.uploadImage(imageSource)
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
      logger.info('Activated Product View');
    }
  }
})();
