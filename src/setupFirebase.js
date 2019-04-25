import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAw5XkrAWj_pcZvir0w0NeaJ3aQkmbOUy0",
    authDomain: "obshab.firebaseapp.com",
    databaseURL: "https://obshab.firebaseio.com",
    projectId: "obshab",
    storageBucket: "obshab.appspot.com",
    messagingSenderId: "1032243749230"
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth()
  export const db = firebase.database()
  export const dbRef = db.ref()