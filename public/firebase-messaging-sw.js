importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js")

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js")

firebase.initializeApp({

    apiKey: "AIzaSyDV4YXhmlT1qKJ4YDVlqa-BaFeD006kk0A",

    authDomain: "motocity-app.firebaseapp.com",

    projectId: "motocity-app",

    storageBucket: "motocity-app.appspot.com",

    messagingSenderId: "572745591874",

    appId: "1:572745591874:web:73784cbb3ab1d6c34311db",
    
    measurementId: "G-82WLWFGKH5"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {

    const notificationTitle = payload.notification?.title

    const notificationOptions = {

        body: payload.notification?.body,

        icon: payload.notification?.image,

        requireInteraction: true
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})