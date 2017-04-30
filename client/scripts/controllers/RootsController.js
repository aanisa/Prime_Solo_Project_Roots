rootsApp.controller('RootsController', ['$scope','UserService', function ($scope, UserService) {
UserService.getBio();
UserService.getRelations();

$scope.logout = UserService.logout;

$scope.bioObject = UserService.bioObject;
$scope.viewBio = UserService.viewBio;

}]);
