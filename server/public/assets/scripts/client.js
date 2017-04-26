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
      controller: "LoginController",
      resolve: {
            getuser : ['UserService', function(UserService){
              return UserService.getuser();
            }]
          }
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: "LoginController"
    })
    .when('/userWelcome', {
      templateUrl: '/views/templates/userWelcome.html',
      controller: "UserController",
      resolve: {
          getuser : ['UserService', function(UserService){
            return UserService.getuser();
          }]
        }
      })
      .when('/bio', {
        templateUrl: '/views/templates/bio.html',
        // controller: 'BioController'
      })

      .when('/roots', {
        templateUrl: '/views/templates/roots.html',
        // controller: 'RootsController'
      })

      .when('/editUser', {
        templateUrl: '/views/templates/editUser.html',
        // controller: 'EditUSerController'
      })

    .otherwise({
      redirectTo: 'home'
    });
}]);

console.log('JS Here!');
