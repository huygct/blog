/**
 * Created by Knightzoro on 4/5/16.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.product')
    .controller('ProductManagerController', ProductManagerController);

  ProductManagerController.$inject = ['$rootScope', '$mdDialog', 'logger', 'productManagerService',
    '$scope', '$mdMedia', 'appConstant', 'categoryService', 'commonService'];
  /* @ngInject */
  function ProductManagerController($rootScope, $mdDialog, logger, productManagerService,
                                    $scope, $mdMedia, appConstant, categoryService, commonService) {
    $rootScope.nameApp = 'Product Manager';
    var vm = this;
    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
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
          });
      }, function() {
        // not delete
      });
    }

    // load category list
    function loadCategory(categoryId) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      vm.cache.categoryList.length = 0;

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
        });
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
          };
        })
        .catch(function (error) {
          alert.type = 'danger';
          alert.msg = 'Lấy thông tin product thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
          return {
            results: [],
            totalResultCount: 0
          };
        });
    }

    /**
     * call from html
     */
    vm.paginatorCallback = loadData;

    // Called when the editor is completely ready.
    vm.onReady = function () {
      // ...
      //console.log('finish description');
    };

    /**
     * add Product
     */
    vm.goToAddProductView = function () {
      vm.cache.currentView = productManagerService.getView.add;
      vm.cache.currentProduct = defaultProduct();
      vm.cache.descriptionForProduct = null;
      vm.cache.currentImages = angular.copy(vm.cache.imagesOfApp);
      vm.cache.typeInputImage = '';

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
        });
    };

    /**
     * edit product
     */
    vm.goToEditProductView = function () {
      vm.cache.currentProduct = angular.copy(vm.selectedProduct[0]);
      vm.cache.currentImages = angular.copy(vm.cache.imagesOfApp);
      if(_.get(vm.cache, 'currentProduct.galleries.length', -1) > 0) {
        _.forEach(vm.cache.currentProduct.galleries, function (image) {
          var index = _.findIndex(vm.cache.currentImages, function(img) {
            return image.name === img.name;
          });
          if(index !== -1){
            vm.cache.currentImages[index].selected = true;
          }
        });
      } else {
        vm.cache.currentProduct.galleries = [];
      }

      if(vm.cache.currentProduct.hasOwnProperty('createdAt')) {
        delete vm.cache.currentProduct['createdAt'];
      }
      if(vm.cache.currentProduct.hasOwnProperty('updatedAt')) {
        delete vm.cache.currentProduct['updatedAt'];
      }
      vm.cache.currentProduct.category = _.get(vm.cache.currentProduct, 'category.id', null);
      vm.cache.descriptionForProduct = vm.cache.currentProduct.description;
      vm.cache.typeInputImage = vm.cache.currentProduct.imageUrl ? 'available' : '';
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
        });
    };

    vm.backToTableView = function () {
      vm.cache.currentProduct = defaultProduct();
      vm.selectedProduct = [];
      vm.cache.file = {};
      vm.cache.typeInputImage = '';
      vm.cache.descriptionForProduct = null;
      vm.cache.categoryList.length = 0;
      vm.cache.currentView = productManagerService.getView.main;
    };

    /**
     * upload image to server
     */
    vm.uploadImageToServer = function(photo) {
      vm.cache.file.loading = true;
      vm.cache.currentProduct.imageUrl = '';

      productManagerService.api.uploadImage(photo)
        .then(function(response){
          commonService.updateGallery(response.data.files, 'icon')
            .then(function (newPhotos) {
              vm.cache.file.imageSource = {};
              vm.cache.currentProduct.imageUrl = newPhotos[0].path;
              vm.cache.currentProduct.imageSmallUrl = 'images/icons/' + newPhotos[0].name;
            })
            .catch(function () {
              vm.alert.type = 'danger';
              vm.alert.msg = 'Upload photos thất bại...';
              vm.alert.show = true;
            })
            .finally(function () {
              vm.cache.file.loading = false;
            });
        })
        .catch(function() {
          vm.cache.currentProduct.imageUrl = '';
        });
    };

    /**
     * callback from table directive
     * @param ids
     */
    vm.selectedRowCallback = function (ids) {
      vm.selectedProduct.length = 0;
      _.forEach(ids, function (id) {
        vm.selectedProduct.push(_.find(productList.data, 'id', id));
      });
    };

    /**
     * delete product
     * @param ids
     */
    vm.deleteRowCallback = function (ids) {
      showAlertWhenDeleteProduct(ids);
    };

    /**
     * show detail of product
     */
    vm.showDetailProduct = function (ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: DetailProductController,
        templateUrl: appConstant.product.urlTemplates.detail,
        //parent: angular.element($document[0].querySelector('#product-manager-app-id')),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          product: vm.selectedProduct[0]
        },
        fullscreen: useFullScreen
      })
        .then(function(answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function() {
          vm.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        vm.customFullscreen = (wantsFullScreen === true);
      });
    };

    vm.selectedIconForProduct = function(icon) {
      vm.cache.currentProduct.imageUrl = 'images\\' + icon.name;
      vm.cache.currentProduct.imageSmallUrl = 'images\\icons\\' + icon.name;
    };

    vm.selectedImageForProduct = function selectedImageForProduct (image) {
      var newValue = !image.selected;

      if(newValue) {
        if(_.get(vm.cache.currentProduct, 'galleries.length', -1) < 3){
          image.selected = true;
          vm.cache.currentProduct.galleries.push(image);
        }
      } else {
        _.remove(vm.cache.currentProduct.galleries, function (img) {
          return img.name === image.name;
        });
        image.selected = false;
      }
    };

    /**
     * get default product
     */
    function defaultProduct() {
      return {
        galleries: []
      }
    }

    /**
     * ended file
     */
    function DetailProductController($scope, $mdDialog, product) { // controller for detail product dialog
      $scope.product = product;

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

    function getIconsProduct() {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      productManagerService.api.getIconsProduct()
        .then(function (response) {
          vm.cache.icons = response.data || [];
        })
        .catch(function () {
          alert.type = 'danger';
          alert.msg = 'Lấy hình ảnh icons thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    }

    function getImages() {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      productManagerService.api.getImages()
        .then(function (response) {
          vm.cache.imagesOfApp = response.data || [];
        })
        .catch(function () {
          alert.type = 'danger';
          alert.msg = 'Lấy hình ảnh thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        });
    }

    function activate() {
      logger.info('Activated Product View');
      getIconsProduct();
      getImages();
    }

    activate();
  }
})();
