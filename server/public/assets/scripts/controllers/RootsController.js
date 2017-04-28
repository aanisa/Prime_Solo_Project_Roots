rootsApp.controller('RootsController', ['$scope','UserService', function ($scope, UserService) {
UserService.getBio();

$scope.logout = UserService.logout;

$scope.bioObject = UserService.bioObject;
}]);
