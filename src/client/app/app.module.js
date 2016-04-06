(function () {
    'use strict';

    angular.module('app', [
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

        'app.demo',

        'app.admin',
        'app.dashboard',
        'app.admin.product',
        'app.admin.category',

        'app.user.blog',
        'app.user.product',
        'app.user.cart',
        'app.user.order'
    ]);

})();
