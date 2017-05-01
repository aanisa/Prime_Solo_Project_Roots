/*jshint esversion: 6 */
rootsApp.controller('BioController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){

$scope.user = UserService.userObject;
$scope.logout = UserService.logout;

$scope.relatives = UserService.relatives;
$scope.update = UserService.updateRelative;
$scope.newBio = UserService.newRelation;
$scope.viewSelectedBio = UserService.viewSelectedBio;
$scope.selectedRelative = UserService.selectedRelative;

UserService.getRelatives();
UserService.getRelations();

}]);
