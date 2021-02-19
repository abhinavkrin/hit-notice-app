/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCnu-hVICmMu4NDtuEM9mLwnYSLQwa3MzM",
  authDomain: "development-and-test-292807.firebaseapp.com",
  projectId: "development-and-test-292807",
  storageBucket: "development-and-test-292807.appspot.com",
  messagingSenderId: "665244359453",
  appId: "1:665244359453:web:77f4712198c450f5a5dff4",
  measurementId: "G-X0XNYMJZSJ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
