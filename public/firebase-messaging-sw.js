/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  if(payload.data && payload.data.notice){
        const notice = JSON.parse(payload.data.notice);
        const notificationTitle = "New Notice from HITK";
        const notificationOptions = {
            body: notice.name,
            icon: '/logo192.png'
        };
        self.registration.showNotification(notificationTitle,notificationOptions);
    }
    return null;
});