/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,jsx,ts,tsx}", "./src/static/*.{html,css}", "./src/css/*.css", "./src/components/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#FFFFFF',
      'black': '#000000',
      'blue': '#023E8A',
      'orange': '#EB5E28',
      'primary-bg': '#201F1D',
    },
    fontFamily: {
      'primary': ['Poppins', 'sans-serif'],
      'title': ['Teko', 'sans-serif'],
    },
    fontSize: {
      base: '20px',
      xl: '25px',
      '2xl': '30px',
      '3xl': '35px',
      '4xl': '60px',
      '5xl': '120px',
    },
    extend: {
      spacing: {
        '10': '10px',
        'sidebar': '70px',
        '50': '50px',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
