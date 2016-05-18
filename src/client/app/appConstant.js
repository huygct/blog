(function () {
  'use strict';

  angular
    .module('app')
    .constant('appConstant', {

      USER_APP: 'app123456',
      YOUR_CART: 'app123456_cart',

      ANON: 0,
      USER_AUTH: 9,
      ADMIN_AUTH: 999,

      core: {
        api: {
          addUser: 'auth/register',
          login: 'auth/authenticate'
        }
      },

      user: {
        api: {
          model: 'user'
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
          model: 'event',
          updateEventForProduct: 'event/updateEventForProduct'
        },
        urlTemplates: {
          main: 'app/appAdmin/event/templates/tableEvent.html',
          add: 'app/appAdmin/event/templates/actionEvent.html',
          edit: 'app/appAdmin/event/templates/actionEvent.html'
        }
      },

      order: {
        api: {
          model: 'order',
          getNumberNotDeliver: 'order/getNumberNotDeliver'
        }
      },

      setting: {
        api: {
          model: 'setting',
          uploadLogo: 'api/uploadFile'
        }
      },

      offlineSale: {
        api: {
          model: 'offlineSale'
        },
        urlTemplates: {
          main: 'app/appAdmin/offlineSale/templates/listOfflineSale.html',
          add: 'app/appAdmin/offlineSale/templates/actionOfflineSale.html',
          edit: 'app/appAdmin/offlineSale/templates/actionOfflineSale.html'
        }
      }

    });
})();
