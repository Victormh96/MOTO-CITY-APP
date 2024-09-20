<template>
  <!--Animation-->
  <div class="fade-in">

    <!--Router-->
    <router-view />
  </div>

  <!--Provider-->
  <a-config-provider :theme="customTheme" />
</template>

<!--========Script========-->
<script>
import { ref, onMounted } from "vue"

import { initializeApp } from "firebase/app"

import { getMessaging, getToken, onMessage } from "firebase/messaging"

export default {
  name: "App",

  data() {
    return {
      customTheme: {

        token: {

          fontSizeIcon: 13,

          boxShadow: "none",

          borderRadius: "0",

          fontSizeLG: ".9rem",

          colorInfo: "#196789",

          colorPrimary: "#891924",

          colorText: "var(--texto)",

          boxShadowTertiary: "none",

          boxShadowSecondary: "none",

          colorPrimaryBg: "#a026322c",

          colorBorder: "var(--borde)",

          controlOutline: "transparent",

          colorBgMask: "rgba(0, 0, 0, 0.8)",

          colorPrimaryHover: "var(--borde)",

          fontFamily: "Poppins, sans-serif",

          colorBgElevated: "var(--background)",

          colorBorderSecondary: "var(--borde)"
        }
      }
    }
  },

  setup() {

    const firebaseConfig = {

      apiKey: "AIzaSyDLUa77UGt7KCNcI93SR-Qt4u7UpjX1Um0",

      authDomain: "motocity-20ba8.firebaseapp.com",

      projectId: "motocity-20ba8",

      storageBucket: "motocity-20ba8.appspot.com",

      messagingSenderId: "833916410269",

      appId: "1:833916410269:web:7d799626cec2cbb022f774"
    }

    let token = ref(null)

    onMounted(() => {

      const app = initializeApp(firebaseConfig)

      const messaging = getMessaging()

      onMessage(messaging, (payload) => {

        const notificationTitle = payload.notification?.title

        const notificationOptions = {

          body: payload.notification?.body,

          icon: payload.notification?.image,

          requireInteraction: true
        }

        new Notification(notificationTitle, notificationOptions)
      })

      getToken(messaging, { vapidKey: "BBZ5q6x5AAmYawImMQH5CTnrOTMMgT12EUlJW9Jf_M8lGW3lx9Eesead-2IJkAGnavDOvOte3S24HGu2c9nQ5MM" })

        .catch((err) => {

          console.error(err)
        })
    })
  }
};
</script>