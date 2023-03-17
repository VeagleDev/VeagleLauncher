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
      'dark-orange': '#FF4700',
      'primary-bg': '#201F1D',
      'black-trans': '#0000009c',
      'gray': '#333333',
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
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
    },
    extend: {
      spacing: {
        'max-screen-width': '2560px',
        'icon': '30px',
        'sidebar': '60px',
        'button': '180px',
        'paragraphe': '80vw',
        'cell': '300px',
        '10': '10px',
        '10p': '10%',
        '20': '20px',
        '30': '30px',
        '40': '40px',
        '50': '50px',
        '60': '60px',
        '70': '70px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        'sidebar': '9999',
        'bg': '-1',
      },
      boxShadow: {
        'btn': '0 5px 30px -10px',
        'card': '0 0 50px -10px',
      },
      animation: {
        'popup-remove': '.4s ease both popupRemove',
      },
      keyframes: {
        popupRemove: {
          '0%': { transform: 'translateX(0)', opacity: '100' },
          '100%': { transform: 'translateX(110%)', opacity: '0' }
        }
      }
    }
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
