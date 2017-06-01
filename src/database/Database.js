/* Dependencies */
import * as firebase from "firebase";

export default class Database {
  // User
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
      let dogs = [];

      if (snapshot.val()) { dogs = snapshot.val(); }

      callback(Object.keys(dogs).map(key => dogs[key]));
    });
  }

  static deleteUserDog(dogId, userId, callback) {
    let userDogsPath = "/user/" + userId + "/dogs";

    firebase.database().ref(userDogsPath).once('value', snapshot => {
      const rawDogs = snapshot.val();
      const dogs = Object.keys(rawDogs).map(key => rawDogs[key]);
      dogs.forEach((dog, index) => {
        if (dog.id === dogId) {
          userDogsPath = "/user/" + userId + "/dogs/" + Object.keys(rawDogs)[index];
          return firebase.database().ref(userDogsPath).remove().then(callback);
        }
      });
    });
  }

  // Dog
  static deleteDog(dogId, callback) {
    let dogsPath = "/dog/" + dogId;

    firebase.database().ref(dogsPath).remove().then(callback);
  }

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

  static setDogDetails(dogId, name, breed, age, callback) {
    let dogDetailsPath = "/dog/" + dogId + "/details";

    firebase.database().ref(dogDetailsPath).set({
      name: name,
      breed: breed,
      age: age
    }).then(callback);
  }

  static listenDogDetails(dogId, callback) {
    let dogDetailsPath = "/dog/" + dogId + "/details";

    firebase.database().ref(dogDetailsPath).on('value', snapshot => {
      let details;

      if (snapshot.val()) { details = snapshot.val(); }

      callback(details);
    });
  }

  static listenDogsDetails(callback) {
    let dogsDetailsPath = "/dog";

    firebase.database().ref(dogsDetailsPath).on('value', snapshot => {
      let details = [];

      if (snapshot.val()) { details = snapshot.val(); }

      Object.keys(details).forEach(key => details[key].key = key);

      callback(Object.keys(details).map(key => details[key]));
    });
  }
}


