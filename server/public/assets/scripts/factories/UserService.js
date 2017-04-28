/*jshint esversion: 6 */
rootsApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded - Checking User');

  //object with user authentication data (response.data contains username, password, firstName, lastName)
  let userObject = {};

  class PersonBio {
    constructor(user_id, id, firstName, lastName, birthday, age, alive){
      this.user_id = user_id;
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthday = birthday;
      this.age = age;
      this.alive = alive;
    }
  }

  let bioObject = new PersonBio();


  return {
    userObject : userObject,
    bioObject : bioObject,
    PersonBio: PersonBio,

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
    updateBio : () => {
      $http.put('/bio', bioObject).then(function(response){
        console.log(response);
      });
    },


    saveBio : () => {
      $http.post('/bio' ).then(function(response){
        console.log(response);
        //will get empty array back - how works with angular?? In jquery would just append to DOM
      });
    },

    getBio : () => {
      $http.get('/bio').then(function(response){
        //store response.data array into an object
        for (let index of response.data){
          bioObject.user_id = index.user_id;
          bioObject.id = index.id;
          bioObject.firstName = index.firstName;
          bioObject.lastName = index.lastName;
          bioObject.birthday = index.birthday;
          bioObject.age = index.age;
          bioObject.alive = index.alive;
        }
        console.log('BIO OBJECT:', bioObject);
      });
    }


};















}]);
