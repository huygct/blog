/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .controller('ProductManagerController', ProductManagerController);

  ProductManagerController.$inject = ['$q', '$mdDialog', 'logger', 'productManagerService',
    '$scope', '$mdToast', 'appConstant', 'categoryService'];
  /* @ngInject */
  function ProductManagerController($q, $mdDialog, logger, productManagerService,
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
    function showAlertWhenDeleteProduct(ids) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Would you like to delete this products?')
        .textContent('All of the product selected will be remove when you click yes!!!')
        .ariaLabel('Lucky day')
        .ok('YES')
        .cancel('NO');
      $mdDialog.show(confirm).then(function() {
        // perform delete
        var alert = vm.cache.alert;
        alert.show = false;
        vm.cache.spinnerLoading = true;
        productManagerService.api.deleteProduct(ids)
          .then(function(response){
            alert.type = 'success';
            alert.msg = 'Đã xóa thành công...';
            alert.show = true;
          })
          .catch(function(error) {
            alert.type = 'danger';
            alert.msg = 'Đã xóa thất bại!!! Vui lòng thực hiện lại...';
            alert.show = true;
          })
          .finally(function() {
            vm.cache.spinnerLoading = false;
          })
      }, function() {
        // not delete
      });
    }

    // load category list
    function loadCategory(categoryId) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;

      categoryService.api.getCategoryList()
        .then(function (response) {
          vm.cache.categoryList = response.data;
          if(vm.cache.categoryList.length === 0) {
            alert.type = 'danger';
            alert.msg = 'Chưa có category!!! Vui lòng thêm mới category...';
            alert.show = true;
          } else {
            vm.cache.currentProduct.category = categoryId || vm.cache.categoryList[0].id;
          }
        })
        .catch(function (error) {
          // add error
          alert.type = 'danger';
          alert.msg = 'Không lấy được category!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    }

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

    /**
     * add Product
     */
    vm.goToAddProductView = function () {
      vm.cache.currentView = productManagerService.getView.add;
      vm.cache.currentProduct = {};

      loadCategory();
    };

    vm.addProduct = function(product) {
      product.description = vm.cache.descriptionForProduct; // set description

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
      vm.cache.currentProduct = angular.copy(vm.selectedProduct[0]);
      if(vm.cache.currentProduct.hasOwnProperty('createdAt')) {
        delete vm.cache.currentProduct['createdAt'];
      }
      if(vm.cache.currentProduct.hasOwnProperty('updatedAt')) {
        delete vm.cache.currentProduct['updatedAt'];
      }
      vm.cache.currentProduct.category = _.get(vm.cache.currentProduct, 'category.id', null);
      vm.cache.descriptionForProduct = vm.cache.currentProduct.description;
      vm.cache.currentView = productManagerService.getView.edit;

      loadCategory(vm.cache.currentProduct.category);
    };

    vm.updateProduct = function(product) {
      product.description = vm.cache.descriptionForProduct; // set description

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
      vm.cache.currentProduct = {};
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
    vm.selectedRowCallback = function (ids) {
      vm.selectedProduct.length = 0;
      _.forEach(ids, function (id) {
        vm.selectedProduct.push(_.find(productList.data, 'id', id));
      });
      console.log(vm.selectedProduct);
    };

    /**
     * delete product
     * @param rows
     */
    vm.deleteRowCallback = function (ids) {
      showAlertWhenDeleteProduct(ids);
    };

    activate();

    function activate() {
      logger.info('Activated Product View');
    }
  }
})();
