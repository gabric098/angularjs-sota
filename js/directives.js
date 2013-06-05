'use strict';

/* Directives */


angular.module('sotaApp.directives', []).
    directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
    }])
    .directive('toggle', function() {
        return function(scope, elem, attrs) {
            scope.$on('event:toggle', function() {
                console.log('aaa');
            });
        };
    });
