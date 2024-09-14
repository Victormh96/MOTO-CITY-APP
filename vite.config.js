import {
  defineConfig
} from "vite"

import {
  VitePWA
} from "vite-plugin-pwa"

import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [

    vue(),

    VitePWA({

      registerType: "autoUpdate",

      manifest: false
    })
  ],

  build: {

    chunkSizeWarningLimit: 2000
  },

  server: {

    port: 8081,

    host: "0.0.0.0",

    strictPort: true
  },

  resolve: {

    alias: {

      "@": "/src"
    }
  }
})
