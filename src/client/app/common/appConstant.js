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
      }

    });
})();
