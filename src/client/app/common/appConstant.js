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
          main: 'app/scripts/product/table/tableProduct.html',
          add: 'app/scripts/product/action/actionProduct.html',
          edit: 'app/scripts/product/action/actionProduct.html'
        }
      }

    });
})();
