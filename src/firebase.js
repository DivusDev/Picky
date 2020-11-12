
import * as firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCI8Vfkxx-y7qZu4-KJv7xhorHcjEpVrSI",
    authDomain: "picky-b31be.firebaseapp.com",
    databaseURL: "https://picky-b31be.firebaseio.com",
    projectId: "picky-b31be",
    storageBucket: "picky-b31be.appspot.com",
    messagingSenderId: "791358932547",
    appId: "1:791358932547:web:4fdff9a37d3391af56b6f6",
    measurementId: "G-T8LZELSKKV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  
export const postsDB = firebase.firestore().collection("posts");

export const storage = firebase.storage().ref();