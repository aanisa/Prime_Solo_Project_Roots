/*jshint esversion: 6 */
rootsApp.factory('UserService', ['$http', '$location', function($http, $location) {
  console.log('User Service Loaded - Checking User');

  let userObject = {};

  let relatives = {
    savedBios: []
  };

  let relationships = {
    savedRels: []
  };

  let selectedRelative = {
    data: '',
  };

  let selectedPersonID = 0;
  let relativeID = 0;
  let motherId = 0;
  let fatherId = 0;

  selectedPersonFirstName = '';
  selectedPersonLastName = '';

  let relationship = {
    mother_id: null,
    father_id: null
  };

  getuser = () => {
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
  };

  logout = () => {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path('/home');
    });
  };

  getRelatives = () => {
    if (userObject.id) {
      //get data from 'biography' table
      $http.get('/bio').then(function(response) {
        relatives.savedBios = response.data;
        // console.log("ALL BIOS", relatives.savedBios);
        //format day so it doesn't show as time stamp
        for (let index of relatives.savedBios) {
          if (index.birthday) {
            index.birthday = moment(index.birthday).subtract(10, 'days').calendar();
          }
        }
      });
    } else {
      $location.path('/roots');
    }
  };

  getRelations = () => {
    $http.get('/relations').then(function(response) {
      //save data from relationship table into relatives so all data can be stored in one object
      relationships.savedRels = response.data;
      // console.log('ALL BIOS:', relationships);
      for (let index of relationships.savedRels) {
        relativeID = index.person_id;
        motherId = index.mother_id;
        fatherId = index.father_id;
      }
    });
  };

  newRelative = () => {
    if (userObject.id) {
      $http.post('/bio', relatives).then(function(response) {
        selectedPersonID = response.data.rows[0].id;
        relationship.person_id = selectedPersonID;

        newRelation();
      });
    }
  };

  newRelation = () => {
    $http.post('/relations', relationship).then(function(response) {
    });
  };

  updateRelative = (selectedPerson) => {
    $http.put('/bio', selectedPerson.data).then(function(response) {
      console.log('UPDATED Persons Bio:', response.data);
      // updateRelation(selectedPerson);
    });
  };

  updateRelation = (selectedPerson) => {
    //need to get the id of mother and father -> store in relationships.savedRels
    //id from drop down - stored in selectedPerson object
    // selectedPerson.id = relationships.savedRels.[].person_id
    console.log(relationships.savedRels);
    $http.put('/relations', selectedPerson).then(function(response) {
      console.log('Relationship Updated:', response);
    });
  };


  viewSelectedBio = (selectedPerson) => {
    selectedRelative.data = selectedPerson;
    console.log("Viewing Complete Bio Of:", selectedPerson);

    //compare id's of selectedPerson with all Relatives - if match -> saved relations into object
    if (selectedPerson.id === relativeID) {
      console.log("It's a Match!!!");
      for (let index of relatives.savedBios) {
        selectedPersonID = index.id;
        selectedPersonFirstName = index.firstName;
        selectedPersonLastName = index.lastName;
        fullName = selectedPersonFirstName + '' + selectedPersonLastName;

        if (motherId === selectedPersonID) {
          selectedPerson.motherName = fullName;
          selectedPerson.mother_id = selectedPersonID;
        }
        if (fatherId === selectedPersonID) {
          selectedPerson.fatherName = fullName;
          selectedPerson.father_id = selectedPersonID;
        }
      }
    } else {
      console.log('Its not a Match', selectedPerson.id, '!=', relativeID);
    }
  };


  return {
    userObject: userObject,
    relatives: relatives,
    relationships: relationships,
    selectedRelative: selectedRelative,
    selectedPersonID: selectedPersonID,
    relativeID: relativeID,
    motherId: motherId,
    fatherId: fatherId,

    getuser: getuser,
    logout: logout,
    newRelative: newRelative,
    getRelatives: getRelatives,
    updateRelative: updateRelative,
    viewSelectedBio: viewSelectedBio,
    getRelations: getRelations
  };
}]);
