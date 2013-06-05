'use strict';

/* Controllers */

angular.module('sotaApp.controllers', ['ui', 'ui.filters']).
  controller('SummitCtrl', function($scope, Summit, Association, Region, $filter) {
        $scope.summitList = [];
        $scope.summitPreFilteredList = []; // static filters (association / region)
        $scope.summitFilteredList = [];

        /* paging */
        $scope.pagedItems = [];
        $scope.pageSize = 10;
        $scope.currentPage = 0;

        /* sorting */
        $scope.sortField = 'code';
        $scope.sortDir = 'asc';

        /* text filtering */
        $scope.textFilter = '';

        $scope.searchOpen = true;

        $scope.associationList = Association.query();
        $scope.regionList = Region.query();

        $scope.sortJsonArrayByProperty =function (objArray, prop, direct){
            if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
            var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

            if (objArray && objArray.constructor===Array){
                var propPath = (prop.constructor===Array) ? prop : prop.split(".");
                objArray.sort(function(a,b){
                    for (var p in propPath){
                        if (a[propPath[p]] && b[propPath[p]]){
                            a = a[propPath[p]];
                            b = b[propPath[p]];
                        }
                    }

                    return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
                });
            }
        }

        $scope.associationChange = function() {
            $scope.regSelect = null;
            if ($scope.assSelect == null) {
                // reset the summit list if no association has been selected
                $scope.summitList = [];
                $scope.summitPreFilteredList = [];
                $scope.summitFilteredList = [];
                $scope.sortAndPage();
                return;
            }
            $scope.summitList = Summit.query({assCode: $scope.assSelect.code}, function() {
                $scope.summitFilteredList = $scope.summitList;
                $scope.summitPreFilteredList = $scope.summitFilteredList;
                $scope.sortAndPage();
            });
        };

        $scope.regionChange = function() {
            $scope.summitFilteredList = $filter('exactRegCodeMatch')($scope.summitList, $scope.regSelect);
            $scope.summitPreFilteredList = $scope.summitFilteredList;
            $scope.sortAndPage();
        };

        $scope.textFilterChange = function() {
            $scope.summitFilteredList = $scope.summitPreFilteredList; // invalid previous filters
            $scope.summitFilteredList = $filter('nameMatch')($scope.summitPreFilteredList, $scope.textFilter);
            $scope.sortAndPage();
        };

        // filtering
        $scope.assSelect = null;
        $scope.regSelect = null;

        // calculate page in place
        $scope.sortAndPage = function () {
            //apply sorting
            $scope.sortJsonArrayByProperty($scope.summitFilteredList, $scope.sortField, ($scope.sortDir == 'asc') ? 1 : -1)

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

        $scope.sortBy = function(field) {
            if (field != $scope.sortField) {
                $scope.sortDir = 'asc';
            } else {
                $scope.sortDir = ($scope.sortDir == 'asc') ? 'desc' : 'asc';
            }
            $scope.sortField = field;
            $scope.sortAndPage();
        }

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
                    start = (end - maxPagerPages < 0) ? 0 : end - maxPagerPages;
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

        $scope.toggleSearch = function () {
            $scope.searchOpen = !$scope.searchOpen;
            $("#searchForm").collapse('toggle');
            var filterText = ($scope.searchOpen === true) ? 'hide filters' : 'show filters';
            $("#toggleSearch").text(filterText);
            var pageSize = ($scope.searchOpen === true) ? 10 : 20;
            $scope.pageSize = pageSize;
            $scope.sortAndPage();
        }
  });
