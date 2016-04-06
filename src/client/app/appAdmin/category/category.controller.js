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

    var currentCategory = {};
    vm.cache = categoryService.cache;

    /**
     * ------------------------------------------------------------------
     */
    function loadData () {
      categoryService.api.getCategoryList("aa")
        .then(function (data) {
          vm.dataList = data;
        }, function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log('OK');
        });
    }

    /**
     * add Category
     */
    vm.goToAddCategoryView = function () {
      vm.cache.currentView = categoryService.getView.add;
      vm.currentCategory = {};
    };

    vm.addCategory = function(category) {
      console.log('Add Category action: ', category);
    };

    /**
     * edit category
     */
    vm.goToEditCategoryView = function () {
      vm.currentCategory = angular.copy(currentCategory);
      console.log('--xx ', vm.currentCategory);
      vm.cache.currentView = categoryService.getView.edit;
    };

    vm.updateCategory = function (category) {
      console.log('Update Category action: ', category);
    };

    vm.backToTableView = function () {
      vm.currentCategory = {};
      vm.cache.currentView = categoryService.getView.main
    };

    /**
     * callback from table directive
     * @param rows
     */
    vm.selectedRowCallback = function (rows) {
      currentCategory = rows[0];
      console.log('rows: ', rows);
    };

    activate();

    function activate() {
      loadData();
      logger.info('Activated Category View');
    }
  }
})();
