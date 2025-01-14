// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ["@unocss/nuxt", "@nuxt/fonts", "@nuxt/icon"],
  unocss: {
    preflight: true,
  },
  css: ["@unocss/reset/tailwind.css"],
  nitro: {
    preset: "vercel",
  },
});
