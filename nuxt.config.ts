// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Добавляем Pinia здесь:
  modules: [
    "nuxt-swiper",
    "@pinia/nuxt", // <-- ВАЖНО! Pinia добавлена сюда
  ],
});