import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAli8zYgyiX4F6CPrYWNc8SIrYloMfzClo",
    authDomain: "babble-79386.firebaseapp.com",
    databaseURL: "https://babble-79386.firebaseio.com",
    projectId: "babble-79386",
    storageBucket: "babble-79386.appspot.com",
    messagingSenderId: "92146957101",
    appId: "1:92146957101:web:d6660ee77e35204a1a31a4",
    measurementId: "G-JYXGW8F2NL"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore;
export const auth = firebase.auth;
export const storage = firebase.storage;