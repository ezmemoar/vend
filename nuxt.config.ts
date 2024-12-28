import { addImportsDir } from "nuxt/kit";
import colors from "tailwindcss/colors";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    dirs: [
      "./constants",
      "./interfaces",
      "./interfaces/general",
      "./services",
    ],
  },
  ssr: false,
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
            main: {
              DEFAULT: colors.blue[500],
              ...colors.blue,
            },
            success: {
              DEFAULT: colors.green[500],
              ...colors.green,
            },
            danger: {
              DEFAULT: colors.red[500],
              ...colors.red,
            },
            warning: {
              DEFAULT: colors.amber[500],
              ...colors.amber,
            },
            info: {
              DEFAULT: colors.blue[500],
              ...colors.blue,
            },
          },
        },
      },
    },
  },
});
