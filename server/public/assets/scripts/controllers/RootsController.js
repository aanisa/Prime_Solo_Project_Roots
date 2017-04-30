rootsApp.controller('RootsController', ['$scope','UserService', function ($scope, UserService) {
UserService.getAll();

$scope.logout = UserService.logout;

$scope.bioObject = UserService.bioObject;
$scope.viewBio = UserService.viewBio;

}]);
