export default defineAppConfig({
  ui: {
    primary: "main",
    gray: 'slate',
    table: {
      divide: 'divide-y divide-slate-300 dark:bg-slate-900',
      th: {
        color: "bg-slate-100 dark:bg-slate-800",
      },
    },
    button: {
      default: {
        size: "lg",
      },
    },
    input: {
      default: {
        size: "lg",
      },
    },
    inputMenu: {
      default: {
        size: "lg",
      },
    },
    select: {
      default: {
        size: "lg",
      },
    },
    selectMenu: {
      default: {
        size: "lg",
      },
    },
    textarea: {
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
    verticalNavigation: {
      padding: "py-3 px-2",
      active: "text-white before:bg-transparent dark:before:bg-transparent",
      inactive: "text-gray-400 hover:text-gray-300 hover:before:bg-transparent dark:hover:before:bg-transparent",
      icon: {
        active: "text-white dark:text-white",
        inactive: "text-gray-400 hover:text-gray-300 dark:hover:text-white group-hover:text-gray-300 dark:group-hover:text-white",
      }
    },
  },
});
