(function () {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ngMessages',
        'ui.bootstrap',
        'ckeditor',
        'app.core',
        'app.widgets',
        'app.layout',
        'mdDataTable',

        'app.demo',

        'app.admin',
        'app.dashboard',
        'app.admin.product',

        'app.user.blog',
        'app.user.product',
        'app.user.cart',
        'app.user.order'
    ]);

})();
