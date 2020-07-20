import * as firebase from 'firebase';

const firebaseConfig = {
        apiKey: "AIzaSyBP9UJB8Pi-LOYkZxAQAUtQYsiaiP2Do14",
        authDomain: "chatapp-3c5b9.firebaseapp.com",
        databaseURL: "https://chatapp-3c5b9.firebaseio.com",
        projectId: "chatapp-3c5b9",
        storageBucket: "chatapp-3c5b9.appspot.com",
        messagingSenderId: "668631283513",
        appId: "1:668631283513:web:9a8c4e4b8e0605ad75dae8",
        measurementId: "G-07R0SQQPJT"
};

firebase.initializeApp(firebaseConfig);

export default firebase;