/*jshint esversion: 6 */
rootsApp.factory('UserService', ['$http', '$location', function($http, $location) {
  console.log('User Service Loaded - Checking User');

  //object with user authentication data (response.data contains username, password, firstName, lastName)
  let userObject = {};

  class PersonBio {
    constructor(user_id, id, firstName, lastName, birthday, age, alive) {
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
  

  let pplArray = [];

  return {
    userObject: userObject,
    bioObject: bioObject,
    PersonBio: PersonBio,
    pplArray: pplArray,

    //user information for login - routes
    getuser: () => {
      $http.get('/user').then(function(response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.id = response.data.id;
          userObject.firstName = response.data.firstName;
          userObject.lastName = response.data.lastName;
          // console.log('User Data: ', userObject.firstName, userObject.lastName);
        } else {
          // user has no session, bounce them back to the login page
          $location.path('/home');
        }
      });
    },

    logout: () => {
      $http.get('/user/logout').then(function(response) {
        console.log('logged out');
        $location.path('/home');
      });
    },

    //get data from db and store in bioObject
    getBio: () => {

        //store response.data array into an object
        if (userObject.id) {
            $http.get('/bio').then(function(response) {
          for (let index of response.data) {
            bioObject.user_id = userObject.id;
            bioObject.id = index.id;
            bioObject.firstName = index.firstName;
            bioObject.lastName = index.lastName;
            bioObject.birthday = index.birthday;
            bioObject.age = index.age;
            bioObject.alive = index.alive;
          }
            });
        } else {
          $location.path('/editBio');
        }
        console.log('BIO OBJECT:', bioObject);
        console.log('USEROBJECT:', userObject);

    },

    //update biography and send to db
    updateBio: () => {
      if (userObject.id) {
        console.log('BIO!!!', bioObject);
        $http.put('/bio', bioObject).then(function(response) {
          console.log(response);
          // getBio();
        });
      }
    },


    //create new relation
    newBio: () => {
      if (userObject.id) {
        $http.post('/bio', bioObject).then(function(response) {
          console.log(response);

        });
      }
    },

  };









}]);
