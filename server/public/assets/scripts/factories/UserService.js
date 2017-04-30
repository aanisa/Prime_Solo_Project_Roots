/*jshint esversion: 6 */
rootsApp.factory('UserService', ['$http', '$location', function($http, $location) {
  console.log('User Service Loaded - Checking User');

  //object with user authentication data (response.data contains username, password, firstName, lastName)
  let userObject = {};

  let bioObject = {
    savedBios: []
  };

  let onePerson = {
    data: '',
  };

  let relationObj = {
    savedRels: []
  };
  let personBioId = 0;
  let personRelId = 0;
  let motherId = 0;
  let fatherId = 0;

  personFirstName = '';
  personLastName = '';

  return {
    userObject: userObject,
    bioObject: bioObject,
    onePerson: onePerson,
    relationObj: relationObj,
    personBioId: personBioId,
    personRelId: personRelId,
    motherId: motherId,
    fatherId: fatherId,

    //user information for login - routes
    getuser: () => {
      $http.get('/user').then(function(response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.id = response.data.id;
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
          bioObject.savedBios = response.data;
          // console.log("ALL BIOS", bioObject.savedBios);
          //format day so it doesn't show as time stamp
          for (let index of bioObject.savedBios) {
            if (index.birthday) {
              index.birthday = moment(index.birthday).subtract(10, 'days').calendar();
            }
          }
        });
      } else {
        $location.path('/roots');
      }
    },

    //create new relation
    newBio: () => {
      if (userObject.id) {
        $http.post('/bio', bioObject).then(function(response) {
          console.log('Saved to DB:', response);
        });
      }
    },

    //update biography and send to db
    updateBio: (person) => {
      //update bio of selected individual ONLY
      $http.put('/bio', person.data).then(function(response) {
        console.log('UPDATED THIS IN DB:', response);
      });
    },

    viewBio: (person) => {
      onePerson.data = person;
      console.log("VIEWING BIO OF:", person);

      //compare id's of current viewing person - if match -> saved relations into object
      // for (let index of bioObject.savedBios) {
      //   let personBioId = index.id;
      //   // console.log('Will Compare: ', personRelId, 'to', personBioId);
        if (person.id === personRelId) {
          console.log("It's a Match!!!");
              for(let index of bioObject.savedBios) {
                personBioId = index.id;
                personFirstName = index.firstName;
                personLastName = index.lastName;
                fullName = personFirstName + '' + personLastName;

                if (motherId === personBioId) {
                    person.mother = fullName;
                  // console.log('MOTHER NAME:', personFirstName, '', personLastName);
                }
                if (fatherId === personBioId) {
                      person.father = fullName;
                  // console.log('FATHER NAME:', personFirstName, '', personLastName);
                }
              }
        } else {
          console.log('Its not a Match', person.id ,'!=', personRelId);
        }
      // }
    },


    getRelations: () => {
      $http.get('/relations').then(function(response) {
        //save data from relationship table into bioObject so all data can be stored in one object
        relationObj.savedRels = response.data;
        // console.log('ALL BIOS:', relationObj);
        for (let index of relationObj.savedRels) {
          personRelId = index.person_id;
          motherId = index.mother_id;
          fatherId = index.father_id;
        }
      });
    },



    newRelation: () => {
      console.log('NEW RELATION!');
      // if (userObject.id) {
      //   console.log('NEW REL CREATE', );
      // }
    },



  };






}]);
