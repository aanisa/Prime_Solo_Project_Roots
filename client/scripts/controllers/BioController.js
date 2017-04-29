/*jshint esversion: 6 */
rootsApp.controller('BioController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){

//Get User Full name
$scope.user = UserService.userObject;
$scope.logout = UserService.logout;

//Bio object from factory
$scope.bioObject = UserService.bioObject;

//update an existing bio
$scope.update = UserService.updateBio;

//create new bio is not one already
$scope.newBio = UserService.newBio;
$scope.newPerson = UserService.newPerson;

$scope.onePerson = UserService.onePerson;

$scope.viewBio = UserService.viewBio;

UserService.getBio();
}]);
