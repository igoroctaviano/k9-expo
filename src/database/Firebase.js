/* Dependencies */
import * as firebase from "firebase";

class Firebase {
  static initialise() {
    firebase.initializeApp({
      apiKey: "AIzaSyC7gQYzEj0W8A02mETpadftMO-qaKp_x-0",
      authDomain: "ongk9-a4630.firebaseapp.com",
      databaseURL: "https://ongk9-a4630.firebaseio.com/",
      storageBucket: "gs://ongk9-a4630.appspot.com/",
    });
  }
}

module.exports = Firebase;
