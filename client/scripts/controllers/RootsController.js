rootsApp.controller('RootsController', ['$scope','UserService', function ($scope, UserService) {
$scope.logout = UserService.logout;
}]);
