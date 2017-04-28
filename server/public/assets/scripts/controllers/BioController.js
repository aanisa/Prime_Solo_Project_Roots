/*jshint esversion: 6 */
rootsApp.controller('BioController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){

UserService.getBio();

//Get User Full name
$scope.user = UserService.userObject;

//Bio object from factory
$scope.bioObject = UserService.bioObject;
// console.log('BioController BIO:', $scope.bioObject);

$scope.update = UserService.updateBio;

//create new bio is not one already
$scope.newBio = UserService.newBio;



}]);
