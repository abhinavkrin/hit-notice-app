import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/analytics';
const config =  {
  apiKey: "AIzaSyCnu-hVICmMu4NDtuEM9mLwnYSLQwa3MzM",
  projectId: "development-and-test-292807",
  messagingSenderId: "665244359453",
  appId: "1:665244359453:web:77f4712198c450f5a5dff4",
  measurementId: "G-X0XNYMJZSJ"
};

firebase.initializeApp(config);
firebase.analytics();

if(firebase.messaging.isSupported()){
    firebase.messaging();
    firebase.messaging().onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
    });
} else {
    console.log("FCM not supported.")
}

export const myFirebase = firebase;
export const isFCMSupported = firebase.messaging.isSupported();
export const VAPID = process.env.REACT_APP_VAPID;
