import { initializeApp } from "firebase/app"

import { getMessaging, getToken, onMessage } from "firebase/messaging"

const firebaseConfig = {

    apiKey: "AIzaSyDV4YXhmlT1qKJ4YDVlqa-BaFeD006kk0A",

    authDomain: "motocity-app.firebaseapp.com",

    projectId: "motocity-app",

    storageBucket: "motocity-app.appspot.com",

    messagingSenderId: "572745591874",

    appId: "1:572745591874:web:73784cbb3ab1d6c34311db",

    measurementId: "G-82WLWFGKH5"
}

const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app)

export { messaging, getToken, onMessage }
