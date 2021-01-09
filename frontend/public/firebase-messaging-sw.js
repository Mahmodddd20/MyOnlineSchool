importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
    apiKey: "AIzaSyDpzP4niFr8BpV3ebsziRHAMzRY_4YPhms",
    authDomain: "myonlineschool-d5bb4.firebaseapp.com",
    projectId: "myonlineschool-d5bb4",
    storageBucket: "myonlineschool-d5bb4.appspot.com",
    messagingSenderId: "358170051980",
    appId: "1:358170051980:web:3f1ab4cd2297a802fc02a9",
    measurementId: "G-SKP9KW2CBM"
  })

const initMessaging = firebase.messaging()
