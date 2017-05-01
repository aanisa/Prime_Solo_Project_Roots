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

  let saveObj = {
    // person_id :  0,
    mother_id : null,
    father_id: null
  };

  newRelation = () => {
    if (userObject.id) {
      $http.post('/bio', bioObject).then(function(response) {
        personBioId = response.data.rows[0].id;
        saveObj.person_id = personBioId;
        console.log('SaveObj NOw', saveObj);

        newRel();
      });
    }
  };

  newRel = () => {
    $http.post('/relations', saveObj).then(function(response){
      console.log(saveObj);
      console.log('NEW Relation ID:', response.data.rows[0].id);
    });
  };

  return {
    userObject: userObject,
    bioObject: bioObject,
    onePerson: onePerson,
    relationObj: relationObj,
    personBioId: personBioId,
    personRelId: personRelId,
    motherId: motherId,
    fatherId: fatherId,
    saveObj: saveObj,


    //user information for login - routes
    getuser: () => {
      $http.get('/user').then(function(response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.id = response.data.id;
          userObject.firstName = response.data.firstName;
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

    getAll: () => {
      if (userObject.id) {
        //get data from 'biography' table
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
        // get data from 'relations' table
        // $http.get('/relations').then(function(response) {
        //   //save data from relationship table into bioObject so all data can be stored in one object
        //   relationObj.savedRels = response.data;
        //   console.log('ALL Relations:', relationObj);
        //   for (let index of relationObj.savedRels) {
        //     personRelId = index.person_id;
        //     motherId = index.mother_id;
        //     fatherId = index.father_id;
        //   }
        // });

      } else {
        $location.path('/roots');
      }
    },

    newRelation: newRelation,


    //update biography and send to db
    updateAllBio: (person) => {
      // update bio of selected individual ONLY

      // let mother = person.mother;
      // let father = person.father;
      //
      // let saveObj = {
      //   mother,
      //   father,
      //   id : //id in databse
      // };

//when create automatically set parent to null
      //send this: saveObj

      $http.put('/bio', person.data).then(function(response) {
        console.log('UPDATED THIS IN DB:', response);
      });

      //update relations in db
      console.log('PERSON DATA 2 UPDTAE:', person.data);
      console.log(relationObj.savedRels);
      $http.put('/relations').then(function(response){
        console.log('REL TO UPDATE:', response);
      });
    },



    viewBio: (person) => {
      //more descriptive object an dperson
      onePerson.data = person;
      console.log("VIEWING BIO OF:", person);

      //compare id's of current viewing person - if match -> saved relations into object
        if (person.id === personRelId) {
          console.log("It's a Match!!!");
              for(let index of bioObject.savedBios) {
                personBioId = index.id;
                personFirstName = index.firstName;
                personLastName = index.lastName;
                fullName = personFirstName + '' + personLastName;

                if (motherId === personBioId) {
                    person.motherName = fullName;
                    person.mother_id = personBioId;
                  // console.log('MOTHER NAME:', personFirstName, '', personLastName);
                }
                if (fatherId === personBioId) {
                      person.fatherName = fullName;
                      person.father_id = personBioId;
                  // console.log('FATHER NAME:', personFirstName, '', personLastName);
                }
              }
        } else {
          console.log('Its not a Match', person.id ,'!=', personRelId);
        }
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




  };

}]);
