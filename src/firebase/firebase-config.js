import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBT8th0NuF5pmjg9CgsaLFT_lxoqyMK5d4",
    authDomain: "manga-project-app.firebaseapp.com",
    projectId: "manga-project-app",
    storageBucket: "manga-project-app.appspot.com",
    messagingSenderId: "53457855798",
    appId: "1:53457855798:web:d9dd50f8d11a0d43677f97"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export{
    db,
    storage,
    googleAuthProvider,
    facebookAuthProvider,
    firebase
}