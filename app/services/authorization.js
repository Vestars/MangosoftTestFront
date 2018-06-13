'use strict';

angular.module('myApp')
    .factory('authorizationService',['$http','$cookies', '$rootScope', function($http, $cookies, $rootScope) {

    this.login = function(object, callback){
        var data = { success: false, message: ''};
        var objectString = 'password=' + object.password + '&username='+ object.username +'&grant_type=password&scope=read%20write&client_secret=secret&client_id=client';
        $http({
            method: "POST",
            url: "http://localhost:8080/oauth/token",
            data: objectString,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'}
        }).then(function (response) {
            console.log(response);
            $cookies.put("Authorization","Bearer " + response.data.access_token);
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
            data.success = true;
            callback(data);
        },function (err) {
            console.log(err);
            data.success = false;
            data.message = 'Username or password is incorrect';
            callback(data);
        });
    };


        this.register = function(object, callback){
            var data = { success: false, message: ''};
            $http({
                method: "POST",
                url: "http://localhost:8080/register",
                data: object,
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
                data.success = true;
                callback(data);
            },function (err) {
                data.success = false;
                data.message = 'Username must be unique!';
                callback(data);
            });
        };

    this.clear = function () {
        $cookies.remove("Authorization");
        $http.defaults.headers.common.Authorization = '';
    };

    return this;
}]);