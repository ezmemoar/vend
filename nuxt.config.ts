import colors from "tailwindcss/colors";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "Quick Count - %s",
    },
  },
  devtools: { enabled: true },
  ssr: false,
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
      clientId: "",
      clientSecret: "",
    },
  },
  ui: {
    safelistColors: ["green", "red", "amber", "blue", "primary", "secondary"],
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
            main: {
              DEFAULT: "#4857E4",
              50: "#E8EAFC",
              100: "#D6DAF9",
              200: "#B3B9F4",
              300: "#8F98EE",
              400: "#6C78E9",
              500: "#4857E4",
              600: "#2436DF",
              700: "#1C2CBE",
              800: "#17249B",
              900: "#121B77",
              950: "#0F1765",
            },
            secondary: {
              DEFAULT: "#7F56D9",
              50: "#D4C6F2",
              100: "#CBBAEF",
              200: "#B8A1EA",
              300: "#A588E4",
              400: "#926FDF",
              500: "#7F56D9",
              600: "#6635D2",
              700: "#5429B5",
              800: "#452193",
              900: "#351A72",
              950: "#2E1661",
            },
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
