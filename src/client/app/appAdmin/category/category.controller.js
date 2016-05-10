/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.category')
    .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$rootScope', '$http', 'appConstant', 'logger', 'categoryService', '$scope', 'coreService',
    '$mdDialog'];

  /* @ngInject */
  function CategoryController($rootScope, $http, appConstant, logger, categoryService, $scope, coreService,
                              $mdDialog) {
    $rootScope.nameApp = 'Category Manager';
    var vm = this;
    vm.title = 'Category Manager';

    vm.selectedCategory = [];
    vm.cache = categoryService.cache;
    var categoryList = [];
    /**
     * ------------------------------------------------------------------
     */
    function showAlert() {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Can\'t delete')
          .textContent('This categories have exist product!!!')
          .ariaLabel('Can\'t delete')
          .ok('Ok')
      );
    }

    function loadData (page, pageSize) {
      var offset = (page - 1) * pageSize;
      var objectPost = {
        offset: offset.toString(),
        limit: pageSize.toString()
      };

      return categoryService.api.getCategoryWithPage(objectPost)
        .then(function(result) {
          categoryList = result.data;
          return {
            results: categoryList.data,
            totalResultCount: categoryList.total
          }
        });
    }

    /**
     * call from html
     */
    vm.paginatorCallback = loadData;

    /**
     * add Category
     */
    vm.goToAddCategoryView = function () {
      vm.cache.currentView = categoryService.getView.add;
      vm.cache.currentCategory = {};
    };

    vm.addCategory = function(category) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      categoryService.api.addCategory(category)
        .then(function (response) {
          // add success
          vm.backToTableView();
          alert.type = 'success';
          alert.msg = 'Đã thêm category thành công...';
          alert.show = true;
        })
        .catch(function (error) {
          // add error
          alert.type = 'danger';
          alert.msg = 'Thêm category thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    };

    /**
     * edit category
     */
    vm.goToEditCategoryView = function () {
      var currentCategory = angular.copy(vm.selectedCategory[0]);
      vm.cache.currentCategory = {
        id: currentCategory.id,
        name: currentCategory.name,
        description:  currentCategory.description
      };
      vm.cache.currentView = categoryService.getView.edit;
    };

    vm.updateCategory = function (category) {
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      categoryService.api.updateCategory(category, category.id)
        .then(function (response) {
          // add success
          vm.backToTableView();
          alert.type = 'success';
          alert.msg = 'Đã thay đổi category thành công...';
          alert.show = true;
        })
        .catch(function (error) {
          // add error
          alert.type = 'danger';
          alert.msg = 'Thay đổi category thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          vm.cache.spinnerLoading = false;
        })
    };

    vm.backToTableView = function () {
      vm.cache.currentCategory = {};
      vm.selectedCategory = [];
      vm.cache.currentView = categoryService.getView.main;
      activate();
    };

    /**
     * callback from table directive
     * @param ids
     */
    vm.selectedRowCallback = function (ids) {
      vm.selectedCategory.length = 0;
      _.forEach(ids, function (id) {
        vm.selectedCategory.push(_.find(categoryList.data, 'id', id));
      });
    };

    vm.deleteRowCallback = function(ids) {
      var category;
      for(var i = 0; i < ids.length; i++) {
        category = _.find(categoryList.data, 'id', ids[i]);
        if(category.products && category.products.length !== 0) {
          // can not remove because there is exist product --> show notify
          showAlert();
          return;
        }
      }
      var alert = vm.cache.alert;
      alert.show = false;
      vm.cache.spinnerLoading = true;
      categoryService.api.deleteCategory(ids)
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
    };

    activate();

    function activate() {
      logger.info('Activated Category View');
    }
  }
})();
