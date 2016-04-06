(function () {
  'use strict';

  angular
    .module('app')
    .constant('appConstant', {

      product: {
        api: {
          getProductList: 'product/getList',
          addProduct: 'product/add',
          updateProduct: 'product/update',
          deleteProduct: 'product/delete'
        },
        urlTemplates: {
          main: 'app/appAdmin/product/templates/tableProduct.html',
          add: 'app/appAdmin/product/templates/actionProduct.html',
          edit: 'app/appAdmin/product/templates/actionProduct.html'
        }
      },

      category: {
        api: {
          getCategoryList: 'category/getList',
          addProduct: 'category/add',
          updateProduct: 'category/update',
          deleteProduct: 'category/delete'
        },
        urlTemplates: {
          main: 'app/appAdmin/category/templates/tableCategory.html',
          add: 'app/appAdmin/category/templates/actionCategory.html',
          edit: 'app/appAdmin/category/templates/actionCategory.html'
        }
      }

    });
})();
