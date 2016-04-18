/**
 * Created by thuynghi on 06/04/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.admin.category')
    .controller('CategoryController', CategoryController);

  CategoryController.$inject = ['$q', 'dataservice', 'logger', 'categoryService', '$scope', '$mdToast'];
  /* @ngInject */
  function CategoryController($q, dataservice, logger, categoryService, $scope, $mdToast) {
    var vm = this;
    vm.title = 'Category Manager';

    vm.selectedCategory = [];
    vm.cache = categoryService.cache;
    /**
     * ------------------------------------------------------------------
     */
    function loadData () {
      var alert = vm.cache.alert;
      alert.show = false;
      categoryService.api.getCategoryList()
        .then(function (response) {
          console.log(response);
          vm.dataList = response.data;
        }, function (error) {
          // show alert
          alert.type = 'danger';
          alert.msg = 'Lấy thông tin category thất bại!!! Vui lòng thực hiện lại...';
          alert.show = true;
        })
        .finally(function () {
          console.log('load data OK');
        });
    }

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
    };

    vm.backToTableView = function () {
      vm.cache.currentCategory = {};
      vm.selectedCategory = [];
      vm.cache.currentView = categoryService.getView.main
      activate();
    };

    /**
     * callback from table directive
     * @param rows
     */
    vm.selectedRowCallback = function (rows) {
      vm.selectedCategory = rows;
      console.log('rows: ', rows);
    };

    activate();

    function activate() {
      loadData();
      logger.info('Activated Category View');
    }
  }
})();
