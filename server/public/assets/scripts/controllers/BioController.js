/*jshint esversion: 6 */
rootsApp.controller('BioController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){

//Get User Full name
$scope.user = UserService.userObject;
console.log($scope.user);


//Bio object from factory
$scope.bioObject = UserService.bioObject;
console.log($scope.bioObject);

$scope.getBio = UserService.getBio;



}]);
