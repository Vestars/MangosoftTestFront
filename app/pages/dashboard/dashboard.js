'use strict';

angular.module('myApp')

    .controller('DashboardCtrl', ['$scope','$window', 'methodsService', 'authorizationService', function($scope, $window, methodsService, authorizationService) {
        $scope.usersList = [];
        $scope.queryParam = {
            page: 0,
            size: 10,
            asc: true,
            property: "username",
            countPages: 1
        };
        $scope.showUpdateModal = false;
        $scope.updatedUser = {};
        $scope.updatedUserBackup = {};
        $scope.countPagesArray = [];

        methodsService.getUsers($scope.queryParam, function (response) {
           $scope.usersList = response.usersList;
           $scope.queryParam.countPages = Math.ceil(response.count / $scope.queryParam.size);
           $scope.countPagesArray = Array.from({ length: $scope.queryParam.countPages }, (v, k) => k+1);
        });

        $scope.setPage = function (pageNumber) {
            $scope.queryParam.page = pageNumber-1;
            methodsService.getUsers($scope.queryParam, function (response) {
                $scope.usersList = response.usersList;
            });
        };

        $scope.updateUser = function (user) {
            methodsService.updateUser(user, function (response) {
                console.log(response);
                $scope.showUpdateModal = false;
            });
        };

        $scope.deleteUser = function (username, index) {
            methodsService.deleteUser(username, function () {
                $scope.usersList.splice(index, 1);
            });

        };

        $scope.showModal = function(user){
            $scope.updatedUser = user;
            $scope.showUpdateModal = !$scope.showUpdateModal;
        };

        $scope.logout = function () {
            authorizationService.clear();
            $window.location.href = "http://localhost/#/login";
        }
    }]);