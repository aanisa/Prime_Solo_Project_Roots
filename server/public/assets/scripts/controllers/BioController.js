/*jshint esversion: 6 */
rootsApp.controller('BioController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){
UserService.getAll();

//Get User Full name
$scope.user = UserService.userObject;
$scope.logout = UserService.logout;

//Bio object from factory
$scope.bioObject = UserService.bioObject;

//update an existing bio
$scope.update = UserService.updateBio;

//create new bio is not one already
$scope.newBio = UserService.newRelation;

$scope.onePerson = UserService.onePerson;
$scope.viewBio = UserService.viewBio;

$scope.newRelation = UserService.newRelation;
}]);
