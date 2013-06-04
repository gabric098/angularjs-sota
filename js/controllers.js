'use strict';

/* Controllers */

angular.module('sotaApp.controllers', ['ui', 'ui.filters']).
  controller('SummitCtrl', function($scope, Summit) {
        $scope.assSelect = null;
        $scope.regSelect = null;
        $scope.summitList = Summit.query();
        $scope.update = function() {
                $scope.regSelect = null;
        };
  });
