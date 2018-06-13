'use strict';

angular.module('myApp', ['ngRoute', 'ngCookies']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider.when('/login', {
        templateUrl: 'pages/login/login.html',
        controller: 'LoginCtrl'
    });

    $routeProvider.when('/', {
        templateUrl: 'pages/login/login.html',
        controller: 'LoginCtrl'
    });

    $routeProvider.when('/register', {
        templateUrl: 'pages/register/register.html',
        controller: 'RegisterCtrl'
    });

    $routeProvider.when('/dashboard', {
        templateUrl: 'pages/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/login'});

}]).run(['$rootScope', '$location', '$window', '$cookies', '$http',
    function ($rootScope, $location, $window, $cookies, $http) {
        if ($cookies.get('Authorization')) {
            $http.defaults.headers.common['Authorization'] = $cookies.get('Authorization');
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if (($location.path() !== '/login' && $location.path() !== '/register') && !$cookies.get('Authorization')) {
                $location.path('/login');
                $window.location.reload();
            }
        });
}]);
