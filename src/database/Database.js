/* Dependencies */
import * as firebase from "firebase";

export default class Database {
  // Mobile
  static setUserDetails(userId, name, mobile, address, callback) {
    let userDetailsPath = "/user/" + userId + "/details";

    firebase.database().ref(userDetailsPath).set({
      name: name,
      mobile: mobile,
      address: address
    }).then(callback);
  }

  static listenUserDetails(userId, callback) {
    let userDetailsPath = "/user/" + userId + "/details";

    firebase.database().ref(userDetailsPath).on('value', snapshot => {
      let details;

      // Details changed on Database?
      if (snapshot.val()) { details = snapshot.val(); }

      // setState!
      callback(details);
    });
  }

  // User Dog
  static newUserDog(userId, dogId, callback) {
    let userDogsPath = "/user/" + userId + "/dogs";

    firebase.database().ref(userDogsPath).push({ id: dogId }).then(callback);
  }

  static listenUserDogs(userId, callback) {
    let userDogsPath = "/user/" + userId + "/dogs";

    firebase.database().ref(userDogsPath).on('value', snapshot => {
      let dogs;

      // Details changed on Database?
      if (snapshot.val()) { dogs = snapshot.val(); }

      // setState!
      callback(dogs);
    });
  }

  // Dog
  static newDog(name, breed, age, callback) {
    let dogsPath = "/dog/";

    firebase.database().ref(dogsPath).push({
      details: {
        name: name,
        breed: breed,
        age: age
      }
    }).then(data => callback(data.key));
  }

  static setDogDetails(dogId, name, breed, age) {
    let dogDetailsPath = "/dog/" + dogId + "/details";

    firebase.database().ref(dogDetailsPath).push({
      name: name,
      breed: breed,
      age: age
    }).then(data => {
       alert(data);
    });
  }

  static listenDogDetails(dogId, callback) {
    let dogDetailsPath = "/dog/" + dogId + "/details";

    firebase.database().ref(dogDetailsPath).on('value', snapshot => {
      let details;

      // Details changed on Database?
      if (snapshot.val()) { details = snapshot.val(); }

      // setState!
      callback(details);
    });
  }

  static listenDogsDetails(callback) {
    let dogsDetailsPath = "/dog";
    console.log('INSIDE DATABASE');
    firebase.database().ref(dogsDetailsPath).on('value', snapshot => {
      let details = [];

      // Details changed on Database?
      if (snapshot.val()) { details = snapshot.val(); }

      // setState!
      callback(Object.keys(details).map(key => details[key]));
    });
  }
}


