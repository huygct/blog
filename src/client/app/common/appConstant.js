(function () {
  'use strict';

  angular
    .module('app')
    .constant('appConstant', {

      USER_APP: 'app123456',

      core: {
        api: {
          addUser: 'auth/register'
        }
      },

      product: {
        api: {
          getProductList: 'product/getList',
          addProduct: 'product/add',
          updateProduct: 'product/update',
          deleteProduct: 'product/delete',
          uploadImage: 'api/uploadFile'
        },
        urlTemplates: {
          main: 'app/appAdmin/product/templates/tableProduct.html',
          add: 'app/appAdmin/product/templates/actionProduct.html',
          edit: 'app/appAdmin/product/templates/actionProduct.html'
        }
      },

      category: {
        api: {
          getCategoryList: 'category',
          addCategory: 'category',
          updateCategory: 'category',
          deleteCategory: 'category'
        },
        urlTemplates: {
          main: 'app/appAdmin/category/templates/tableCategory.html',
          add: 'app/appAdmin/category/templates/actionCategory.html',
          edit: 'app/appAdmin/category/templates/actionCategory.html'
        }
      }

    });
})();
