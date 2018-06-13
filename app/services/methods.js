'use strict';

angular.module('myApp')
    .service('methodsService',['$http','$cookies', function($http, $cookies) {

        this.getUsers = function(object, callback){
            $http({
                method: "GET",
                url: "http://localhost:8080/dashboard?page=" + object.page + "&size=" + object.size + "&asc=" + object.asc + "&property=" + object.property,
                headers: {'Authorization': $cookies.get("Authorization")}
            }).then(function (response) {
               callback(response.data);
            },function (err) {

            });
        };

        this.updateUser = function(object, callback){
            $http({
                method: "PUT",
                url: "http://localhost:8080/dashboard/update/" + object.username,
                data: object,
                headers: { 'Authorization': $cookies.get("Authorization")}
            }).then(function (response) {
                callback(response.data);
            },function (err) {

            });
        };

        this.deleteUser = function(username, callback){
            $http({
                method: "DELETE",
                url: "http://localhost:8080/dashboard/delete/" + username,
                headers: {'Authorization': $cookies.get("Authorization")}
            }).then(function (response) { callback(response) });
        };


    }]);