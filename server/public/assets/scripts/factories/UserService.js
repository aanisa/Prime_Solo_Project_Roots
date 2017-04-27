/*jshint esversion: 6 */
rootsApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded - Checking User');

  //object with user authentication data (response.data contains username, password, firstName, lastName)
  let userObject = {};

  let bioObject = {
    personBio: []
  };

  return {
    userObject : userObject,
    bioObject : bioObject,

    //user information for login - routes
    getuser : () => {
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.firstName = response.data.firstName;
              userObject.lastName = response.data.lastName;
              // console.log('User Data: ', userObject.firstName, userObject.lastName);
          } else {
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      });
    },

    logout : () => {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path("/home");
        });
    },

    //user data for biography

    saveBio : () => {
      $http.post('/bio').then(function(response){
        console.log(response);
        //will get empty array back - how works with angular?? In jquery would just append to DOM
      });
    },

    getBio : () => {
      $http.get('/bio').then(function(response){
        bioObject.personBio = response.data;
        console.log('This Persons BIO:', bioObject);
      });
    }


};

}]);
