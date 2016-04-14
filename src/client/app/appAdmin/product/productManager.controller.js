/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .directive('fileModel', ['$parse', function ($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
            scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
            });
          });
        }
      };
    }])
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

    /**
     * add Product
     */
    vm.goToAddProductView = function () {
      vm.cache.currentView = productManagerService.getView.add;
      vm.currentProduct = {};
    };
    
    vm.addProduct = function(product) {
      console.log('Add Product action');
    };

    /**
     * edit product
     */
    vm.goToEditProductView = function () {
      vm.currentProduct = angular.copy(vm.selectedProduct[0]);
      vm.cache.currentView = productManagerService.getView.add;
    };

    vm.updateProduct = function(product) {
      console.log('Add Product action');
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
      var url = appConstant.product.api.uploadImage;
      productManagerService.api.uploadImage(url, imageSource)
        .then(function(response){
          console.log('image: ', response);
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
