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

  let possibleRelationID = 0;
  let relativeID = 0;
  let motherId = 0;
  let fatherId = 0;

  possibleRelationFirstName = '';
  possibleRelationLastName = '';

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
      // console.log('ALL RELATIONS', relationships.savedRels);
    });
  };

  newRelative = () => {
    if (userObject.id) {
      $http.post('/bio', relatives).then(function(response) {
        possibleRelationID = response.data.rows[0].id;
        relationship.person_id = possibleRelationID;
        newRelation();
      });
    }
  };

  newRelation = () => {
    $http.post('/relations', relationship).then(function(response) {});
  };

  updateRelative = (selectedPerson) => {
    $http.put('/bio', selectedPerson.data).then(function(response) {
      console.log('UPDATED Persons Bio:', selectedPerson);
      updateRelation(selectedPerson);
    });
  };

  updateRelation = (selectedPerson) => {
    relationship.person_id = selectedPerson.data.id;
    relationship.mother_id = selectedPerson.data.mother_id;
    relationship.father_id = selectedPerson.data.father_id;

    $http.put('/relations', relationship).then(function(response) {
      console.log('Relationship Updated:', relationship);
    });
  };


  viewSelectedBio = (selectedPerson) => {
    selectedRelative.data = selectedPerson;

    for (let index of relatives.savedBios) {
      possibleRelationID = index.id;
      possibleRelationFirstName = index.firstName;
      possibleRelationLastName = index.lastName;
      fullName = possibleRelationFirstName + '' + possibleRelationLastName;

      if (motherId === possibleRelationID) {
        selectedPerson.motherName = fullName;
        selectedPerson.mother_id = motherId;
        console.log('GOT MOTHER', motherId);
      }
      if (fatherId === possibleRelationID) {
        selectedPerson.fatherName = fullName;
        selectedPerson.father_id = fatherId;
        console.log('GOT FATHER', fatherId);
      }
    }
    console.log('FOR SELECTED:', selectedRelative.data);
  };


  return {
    userObject: userObject,
    relatives: relatives,
    relationships: relationships,
    selectedRelative: selectedRelative,
    possibleRelationID: possibleRelationID,
    relativeID: relativeID,
    motherId: motherId,
    fatherId: fatherId,

    getuser: getuser,
    logout: logout,
    newRelative: newRelative,
    getRelatives: getRelatives,
    updateRelative: updateRelative,
    viewSelectedBio: viewSelectedBio,
    getRelations: getRelations,
    updateRelation: updateRelation
  };
}]);
