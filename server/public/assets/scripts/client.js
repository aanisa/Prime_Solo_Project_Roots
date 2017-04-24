var rootsApp = angular.module('rootsApp', ['ngRoute']);

rootsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: "UserController"
      // resolve: {
        //   getuser : ['UserService', function(UserService){
        //     return UserService.getuser();
        //   }]
        // }
      })
      .when('/info', {
        templateUrl: '/views/templates/info.html',
        controller: 'InfoController'
      //   resolve: {
      //   getuser : ['UserService', function(UserService){
      //     return UserService.getuser();
      //   }]
      // }
      })
    .otherwise({
      redirectTo: 'home'
    });
}]);

console.log('JS Here!');
