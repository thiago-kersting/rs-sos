// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/global.css'],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@formkit/auto-animate', '@nuxt/fonts', '@pinia/nuxt']
})