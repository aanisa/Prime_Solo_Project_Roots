var rootsApp = angular.module('rootsApp', ['ngRoute']);

rootsApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      // controller: "HomeController"
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: "UserController",
      resolve: {
          getuser : ['UserService', function(UserService){
            return UserService.getuser();
          }]
        }
      })

    .otherwise({
      redirectTo: 'home'
    });
}]);

console.log('JS Here!');
