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
        controller: 'BioController',
        resolve: {
            getuser : ['UserService', function(UserService){
              return UserService.getuser();
            }]
          }
      })
      .when('/editBio', {
        templateUrl: '/views/templates/editBio.html',
        controller: 'BioController',
        resolve: {
            getuser : ['UserService', function(UserService){
              return UserService.getuser();
            }]
          }
      })

      .when('/roots', {
        templateUrl: '/views/templates/roots.html',
        // controller: 'RootsController',
        resolve: {
            getuser : ['UserService', function(UserService){
              return UserService.getuser();
            }]
          }
      })

      .when('/editUser', {
        templateUrl: '/views/templates/editUser.html',
        controller: 'EditUSerController',
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
