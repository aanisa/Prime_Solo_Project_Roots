rootsApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService',
                    function($scope, $http, $location, UserService) {
    $scope.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    };
    $scope.message = '';

    $scope.login = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = "Enter your email and password!";
      } else {
        // console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            // console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/userWelcome');
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong Information Entered!";
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username === '' || $scope.user.password === '' || $scope.user.firstName === '' || $scope.user.lastName === '') {
        $scope.message = "Please fill complete all fields!";
      } else {
        // console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          // console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again.";
        });
      }
    };
}]);
