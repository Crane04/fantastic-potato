/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "eco-white": "#FFFFFF",
        "eco-dark-green": "#2E7D32",
        "eco-medium-green": "#4CAF50",
        "eco-light-green": "#E8F5E9",
        "eco-dark-teal": "#1A3C34",
        "eco-secondary-dark": "#2E7D32",
        "eco-error-light": "#D32F2F",
        "eco-error-dark": "#EF5350",
      },
    },
  },
  plugins: [],
};


// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./App.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         "eco-white": "#FFFFFF",
//         "eco-dark-green": "#2E7D32",
//         "eco-medium-green": "#4CAF50",
//         "eco-light-green": "#E8F5E9",
//         "eco-dark-teal": "#1A3C34",
//         "eco-secondary-dark": "#2E7D32",
//         "eco-error-light": "#D32F2F",
//         "eco-error-dark": "#EF5350",
//       },
//     },
//   },
//   plugins: [],
// };