rootsApp.controller('RootsController', ['$scope','UserService', function ($scope, UserService) {

$scope.logout = UserService.logout;
$scope.relatives = UserService.relatives;
$scope.newRelative = UserService.newRelative;
$scope.viewSelectedBio = UserService.viewSelectedBio;

UserService.getRelatives();

}]);
