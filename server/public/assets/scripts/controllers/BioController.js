/*jshint esversion: 6 */
rootsApp.controller('BioController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){

UserService.getBio();
//Get User Full name
$scope.user = UserService.userObject;
$scope.logout = UserService.logout;
//Bio object from factory
$scope.bioObject = UserService.bioObject;

$scope.update = UserService.updateBio;

//create new bio is not one already
$scope.newBio = UserService.newBio;
$scope.newPerson = UserService.newPerson;

}]);
