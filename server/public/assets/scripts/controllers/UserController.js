rootsApp.controller('UserController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;

  //get bio when click 'My Bio';
  $scope.getRelatives = UserService.getRelatives;


}]);
