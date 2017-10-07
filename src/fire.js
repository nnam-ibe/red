import firebase from 'firebase'
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyA4mWTtlgWKsDL4QM4xbhUDJzaWSQlsRRs",
  authDomain: "project-red-c2829.firebaseapp.com",
  databaseURL: "https://project-red-c2829.firebaseio.com",
  projectId: "project-red-c2829",
  storageBucket: "project-red-c2829.appspot.com",
  messagingSenderId: "344289801393"
};
firebase.initializeApp(config);
export const firestore = firebase.firestore();
export const auth = firebase.auth();


export const storageKey = 'KEY_FOR_LOCAL_STORAGE';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}
