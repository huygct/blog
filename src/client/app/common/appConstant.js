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
          model: 'product',
          uploadImage: 'api/uploadFile',
          getProductWithPage: 'product/getProductsWithPage',
          getProductsForPage: 'product/getProductsForPage',
          getNumberProduct: 'product/getNumberProduct'
        },
        urlTemplates: {
          main: 'app/appAdmin/product/templates/tableProduct.html',
          add: 'app/appAdmin/product/templates/actionProduct.html',
          edit: 'app/appAdmin/product/templates/actionProduct.html',
          detail: 'app/appAdmin/product/templates/detailProduct.html'
        }
      },

      category: {
        api: {
          getCategoryList: 'category',
          getCategoryWithPage: 'category/getListWithPage',
          addCategory: 'category',
          updateCategory: 'category',
          deleteCategory: 'category',
          deleteCategoryList: 'category/delete'
        },
        urlTemplates: {
          main: 'app/appAdmin/category/templates/tableCategory.html',
          add: 'app/appAdmin/category/templates/actionCategory.html',
          edit: 'app/appAdmin/category/templates/actionCategory.html'
        }
      },

      cart: {
        api: {

        },
        urlTemplates: {
          dialogCart: 'app/appUser/cart/dialog/cartDialog.html'
        }
      },

      event: {
        api: {
          model: 'event'
        },
        urlTemplates: {
          main: 'app/appAdmin/event/templates/tableEvent.html',
          add: 'app/appAdmin/event/templates/actionEvent.html',
          edit: 'app/appAdmin/event/templates/actionEvent.html'
        }
      }

    });
})();
