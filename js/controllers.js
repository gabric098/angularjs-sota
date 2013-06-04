'use strict';

/* Controllers */

angular.module('sotaApp.controllers', ['ui', 'ui.filters']).
  controller('SummitCtrl', function($scope, Summit, Association, Region, $filter) {
        $scope.summitList = [];
        $scope.summitFilteredList = [];
        $scope.pagedItems = [];

        $scope.pageSize = 10;
        $scope.currentPage = 0;

        $scope.associationList = Association.query();
        $scope.regionList = Region.query();

        $scope.associationChange = function() {
            $scope.regSelect = null;
            $scope.summitList = Summit.query({assCode: $scope.assSelect.code}, function() {
                $scope.summitFilteredList = $scope.summitList;
                $scope.groupToPages();
            });
        };

        $scope.regionChange = function() {
            $scope.summitFilteredList = $filter('exactRegCodeMatch')($scope.summitList, $scope.regSelect.code);
            $scope.groupToPages();
        };

        // filtering
        $scope.assSelect = null;
        $scope.regSelect = null;

        // calculate page in place
        $scope.groupToPages = function () {
            $scope.currentPage = 0;
            $scope.pagedItems = [];

            for (var i = 0; i < $scope.summitFilteredList.length; i++) {
                if (i % $scope.pageSize === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.pageSize)] = [ $scope.summitFilteredList[i] ];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.pageSize)].push($scope.summitFilteredList[i]);
                }
            }
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pagedItems.length) {
                $scope.currentPage++;
            }
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.range = function (start, end) {
            var maxPagerPages = 5;
            if (start >= Math.ceil(maxPagerPages/2)) {
                if (start + Math.ceil(maxPagerPages/2) >= end) {
                    start = end - maxPagerPages;
                } else {
                    start = start-Math.floor(maxPagerPages/2);
                }
            } else {
                start = 0;
            }
            if (end > (start + maxPagerPages)) {
                end = start + maxPagerPages;
            }
            var ret = [];
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        }
  });
