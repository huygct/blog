(function () {
    'use strict';

    angular.module('app', [
        'LocalStorageModule',
        'my-compoents',

        'app.core',
        'app.widgets',
        'app.layout',

        'textAngular',
        'ngMaterial',
        'ngMessages',
        'ui.bootstrap',
        'ckeditor',
        'mdDataTable',
        'ngImageInputWithPreview',

        'app.demo',

        'app.admin',
        'app.admin.dashboard',
        'app.admin.product',
        'app.admin.category',
        'app.admin.order',
        'app.admin.event',


        'app.user.blog',
        'app.user.product',
        'app.user.cart',
        'app.user.order'
    ]);

})();

Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
