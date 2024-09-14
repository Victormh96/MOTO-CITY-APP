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
  }
};
</script>