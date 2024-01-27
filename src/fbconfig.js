import {initializeApp} from "firebase/app"

import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCjFgAsB7hDG8xJDEnZ5oGbokWt1X4t-yA",
    authDomain: "task-management-18a92.firebaseapp.com",
    projectId: "task-management-18a92",
    storageBucket: "task-management-18a92.appspot.com",
    messagingSenderId: "215932688576",
    appId: "1:215932688576:web:dccdad79272920ddfef525"
  };
const app=initializeApp(firebaseConfig)

// const projectAuth=firebase.auth()
const database=getFirestore(app)

export {app,database}