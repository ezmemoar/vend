export default defineAppConfig({
  ui: {
    primary: "main",
    gray: "neutral",
    table: {
      th: {
        color: "bg-slate-100",
      },
      td: {
        color: "text-slate-900",
      },
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 right-0 bottom-auto",
    },
    button: {
      default: {
        size: "lg",
      },
    },
    input: {
      base: "disabled:bg-slate-100",
      default: {
        size: "lg",
      },
    },
    inputMenu: {
      base: "disabled:bg-slate-100",
      default: {
        size: "lg",
      },
    },
    select: {
      base: "disabled:bg-slate-100",
      default: {
        size: "lg",
      },
    },
    selectMenu: {
      base: "disabled:bg-slate-100",
      default: {
        size: "lg",
      },
    },
    textarea: {
      base: "disabled:bg-slate-100",
      default: {
        size: "lg",
      },
    },
    toggle: {
      default: {
        size: "lg",
      },
    },
    pagination: {
      default: {
        size: "lg",
      },
    },
  },
});
