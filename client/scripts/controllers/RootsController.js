rootsApp.controller('RootsController', ['$scope','UserService', function ($scope, UserService) {

$scope.logout = UserService.logout;
$scope.relatives = UserService.relatives;
$scope.viewSelectedBio = UserService.viewSelectedBio;

UserService.getRelatives();
}]);
