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
  let motherId = 0;
  let fatherId = 0;

  possibleRelationFirstName = '';
  possibleRelationLastName = '';

  let relationship = {
    mother_id: null,
    father_id: null
  };

  let deleteRelationshipID = 0;

  let ChildNParents = {
    child: '',
    mother: '',
    father: '',
  };

  getuser = () => {
    $http.get('/user').then(function(response) {
      if (response.data.username) {
        // user has a curret session on the server
        userObject.id = response.data.id;
        // console.log('User Obj:', userObject.id);
        userObject.firstName = response.data.firstName;
        getRelatives();
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
      $http.get('/bio').then(function(response) {
        relatives.savedBios = response.data;
        // console.log("ALL BIOS", relatives.savedBios);
        for (let index of relatives.savedBios) {
          if (index.birthday) {
            index.birthday = moment(index.birthday).subtract(10, 'days').calendar();
          }
        }
        getRelations();
      });
    } else {
      // $location.path('/home');
    }
  };

  getRelations = () => {
    if (userObject.id) {
      $http.get('/relations').then(function(response) {
        //save data from relationship table into relatives so all data can be stored in one object
        relationships.savedRels = response.data;
        // console.log('ALL RELATIONS', relationships.savedRels);
      });
    }
  };

  newRelative = () => {
    if (userObject.id) {
      console.log(relatives);
      $http.post('/bio', relatives).then(function(response) {
        possibleRelationID = response.data.rows[0].id;
        relationship.person_id = possibleRelationID;
        newRelation();
        getRelatives();
      });
    }
  };

  newRelation = () => {
    $http.post('/relations', relationship).then(function(response) {});
  };

  updateRelative = (selectedPerson) => {
    console.log(selectedPerson.data);
    if (userObject.id) {
      $http.put('/bio', selectedPerson.data).then(function(response) {
        console.log('UPDATED Persons Bio:', selectedPerson.data);
        updateRelation(selectedPerson);
        getRelatives();
      });
    }
  };

  updateRelation = (selectedPerson) => {
    relationship.person_id = selectedPerson.data.id;
    relationship.mother_id = selectedPerson.data.mother_id;
    relationship.father_id = selectedPerson.data.father_id;

    $http.put('/relations', relationship).then(function(response) {
      console.log('Relationship Updated:', relationship);
    });
  };

//need route param that sets individual id, in url
  viewSelectedBio = (selectedPerson) => {
    selectedRelative.data = selectedPerson;
    console.log('THIS BIO', selectedPerson);
    selectedPersonFullName = selectedPerson.firstName + ' ' + selectedPerson.lastName;
    console.log('THIS PERSON', selectedPersonFullName);
    for (let index of relationships.savedRels) {
      //find selectedPerson's id in 'relations' table & set mother and father ID
      if (index.person_id === selectedPerson.id) {
        motherId = index.mother_id;
        fatherId = index.father_id;
        console.log('This Persons ID', selectedPerson.id);
        console.log(motherId, fatherId);
      }
    }
    for (let index of relatives.savedBios) {
      possibleRelationID = index.id;
      possibleRelationFirstName = index.firstName;
      possibleRelationLastName = index.lastName;
      fullName = possibleRelationFirstName + ' ' + possibleRelationLastName;
      // console.log(relationships.savedRels);
      //store selectedPerson's mother and father name in data key
      if (motherId === possibleRelationID) {
        selectedPerson.motherName = fullName;
        selectedPerson.mother_id = motherId;
        console.log('Mother: ', motherId, fullName);
      } else {
        // console.log('Mother not defined');
      }
      if (fatherId === possibleRelationID) {
        selectedPerson.fatherName = fullName;
        selectedPerson.father_id = fatherId;
        console.log('Father: ', fatherId, fullName);
      }
      else {
        // console.log('Father not defined');
      }
    }
  };

  deleteRelation = (selectedPerson) => {
    if (userObject.id) {
      console.log(relationships.savedRels);
      console.log(selectedPerson.id);
      for (let index of relationships.savedRels) {
        if (selectedPerson.id === index.person_id) {
          deleteRelationshipID = index.id;
          console.log('WILL DELETE FROM RELATIONS', deleteRelationshipID);
        }
      }
      $http.delete('/relations/' + deleteRelationshipID).then(function(response) {
        console.log('DELETED FROM RELATIONS: ', deleteRelationshipID);
      });
      deleteRelative(selectedPerson);
    }
  };

  deleteRelative = (selectedPerson) => {
    deleteRelativeID = selectedPerson.id;
    console.log('WILL DELETE FROM BIOGRAPHY', deleteRelativeID);
    $http.delete('/bio/' + deleteRelativeID).then(function(response) {
      console.log('DELETED FROM RELATIONS: ', deleteRelativeID);
    });
  };


  return {
    userObject: userObject,
    relatives: relatives,
    relationships: relationships,
    selectedRelative: selectedRelative,
    possibleRelationID: possibleRelationID,
    motherId: motherId,
    fatherId: fatherId,
    deleteRelationshipID: deleteRelationshipID,

    getuser: getuser,
    logout: logout,
    newRelative: newRelative,
    getRelatives: getRelatives,
    updateRelative: updateRelative,
    viewSelectedBio: viewSelectedBio,
    getRelations: getRelations,
    updateRelation: updateRelation,
    deleteRelation: deleteRelation,
    deleteRelative: deleteRelative
  };
}]);
