rootsApp.controller('UserController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  // console.log($scope.userObject);

  //get bio when click 'My Bio';
  $scope.getBio = UserService.getBio;


}]);
