'use strict';

angular.module('myApp')

.controller('LoginCtrl', ['$scope', '$location', 'authorizationService', function($scope, $location, authorizationService) {
    $scope.login = function(form) {
        var data = {
            username: form.username,
            password: form.password
        };
        authorizationService.login(data, function (response) {
            if(response.success){
                $location.path("/dashboard");
            }else{
                $scope.success = response.success;
                $scope.errorMsg = response.message;
            }
        });
    };
}]);