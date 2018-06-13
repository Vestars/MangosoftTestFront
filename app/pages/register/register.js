'use strict';

angular.module('myApp')

.controller('RegisterCtrl', ['$scope', '$location', 'authorizationService', function($scope, $location, authorizationService) {

    $scope.register = function(form) {
        console.log(form);
        var data = {
            username: form.username,
            password: form.password,
            firstName: form.firstName,
            lastName: form.lastName
        };
        authorizationService.register(data, function (response) {
            if(response.success){
                $location.path("/login");
            }else{
                $scope.success = response.success;
                $scope.errorMsg = response.message;
            }
        });
    };

}]);