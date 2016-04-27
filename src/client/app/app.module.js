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
