importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js")

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js")

firebase.initializeApp({

    apiKey: "AIzaSyDLUa77UGt7KCNcI93SR-Qt4u7UpjX1Um0",

    authDomain: "motocity-20ba8.firebaseapp.com",

    projectId: "motocity-20ba8",

    storageBucket: "motocity-20ba8.appspot.com",

    messagingSenderId: "833916410269",

    appId: "1:833916410269:web:7d799626cec2cbb022f774"
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