import colors from "tailwindcss/colors";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-09-01",
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@nuxt/fonts",
  ],
  // value set from .env
  runtimeConfig: {
    public: {
      apiUrl: "",
    },
  },
  ui: {
    icons: {
      dynamic: true,
    },
  },
  dayjs: {
    locales: ["id"],
    plugins: ["relativeTime", "timezone"],
    defaultLocale: "id",
    defaultTimezone: "Asia/Jakarta",
  },
  colorMode: {
    preference: "light",
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            main: colors.blue,
            success: colors.green,
            danger: colors.red,
            warning: colors.amber,
            info: colors.blue,
          },
        },
      },
    },
  },
});
