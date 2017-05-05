rootsApp.controller('UserController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;

  $scope.relatives = UserService.relatives;
  $scope.newRelative = UserService.newRelative;
  $scope.viewSelectedBio = UserService.viewSelectedBio;
  $scope.deleteRelation = UserService.deleteRelation;

}]);
