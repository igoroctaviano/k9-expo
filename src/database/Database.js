/* Dependencies */
import * as firebase from "firebase";

export default class Database {
  // Mobile
  static setUserDetails(userId, name, mobile, address) {
    let userDetailsPath = "/user/" + userId + "/details";

    firebase.database().ref(userDetailsPath).set({
      name: name,
      mobile: mobile,
      address: address
    });
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
  static setUserDogs(userId, dogId) {
    let userDogsPath = "/user/" + userId + "/dogs";

    firebase.database().ref(userDogsPath).push({ id: dogId });
  }

  static listenUserDogs(userId, callback) {
    let userDogsPath = "/user/" + userId + "/dogs";

    firebase.database().ref(userDogsPath).on('value', snapshot => {
      let details;

      // Details changed on Database?
      if (snapshot.val()) { details = snapshot.val().push(); }

      // setState!
      callback(details);
    });
  }

  // Dog
  static setDogDetails(dogId, name, breed, age) {
    let dogDetailsPath = "/user/" + dogId + "/details";

    firebase.database().ref(dogDetailsPath).set({
      name: name,
      breed: breed,
      age: age
    }).then(data => {
       alert(data);
    });
  }

  static listenDogDetails(dogId, callback) {
    let dogDetailsPath = "/user/" + dogId + "/details";

    firebase.database().ref(dogDetailsPath).on('value', snapshot => {
      let details;

      // Details changed on Database?
      if (snapshot.val()) { details = snapshot.val(); }

      // setState!
      callback(details);
    });
  }
}

