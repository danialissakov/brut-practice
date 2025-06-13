export default {
    content: [
      "./components/**/*.{vue,js,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./app.vue",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["'PT Sans'", 'sans-serif'],
          roboto: ["'Roboto'", 'sans-serif'],
        },
      },
    },
    plugins: [],
  };