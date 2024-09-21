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
import {
  ref,
  onMounted
} from "vue"

import {
  getToken,
  messaging,
  onMessage
} from "@/utils/firebase"

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

    const token = ref(null)

    onMounted(async () => {

      try {

        onMessage(messaging, (payload) => {

          const notificationTitle = payload.notification?.title

          const notificationOptions = {

            body: payload.notification?.body,

            icon: payload.notification?.image,
            
            requireInteraction: true
          }

          new Notification(notificationTitle, notificationOptions)
        })

        token.value = await getToken(messaging, {

          vapidKey: "BAVl0HlGzcOTV7TaOrFRq3qLW7yySaKy3O0ah2sTfSMaeGJyLf-iQN467lQPbSmLJy-L561Yht7REGVPaUrBjIQ",
        })

      } catch (err) {

        console.error(err)
      }
    })
  }
};
</script>