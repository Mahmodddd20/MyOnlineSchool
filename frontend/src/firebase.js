import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDpzP4niFr8BpV3ebsziRHAMzRY_4YPhms",
    authDomain: "myonlineschool-d5bb4.firebaseapp.com",
    projectId: "myonlineschool-d5bb4",
    storageBucket: "myonlineschool-d5bb4.appspot.com",
    messagingSenderId: "358170051980",
    appId: "1:358170051980:web:3f1ab4cd2297a802fc02a9",
    measurementId: "G-SKP9KW2CBM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase
