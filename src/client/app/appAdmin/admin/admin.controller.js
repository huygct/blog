(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', '$scope'];
    /* @ngInject */
    function AdminController(logger, $scope) {
        var vm = this;
        vm.title = 'Admin';

        // Editor options.
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function () {
            // ...
        };


        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
