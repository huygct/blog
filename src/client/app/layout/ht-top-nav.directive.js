(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        /* @ngInject */
        TopNavController.$inject = ['$mdDialog'];
        function TopNavController($mdDialog) {
            var vm = this;

            var originatorEv;

            this.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            this.announceClick = function(index) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('You clicked!')
                    .content('You clicked the menu item at index ' + index)
                    .ok('Nice')
                    .targetEvent(originatorEv)
                );
                originatorEv = null;
            };
        }

        return directive;
    }
})();
