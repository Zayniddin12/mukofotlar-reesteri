/** @types {import('tailwindcss').Config} */
import { Config } from 'tailwindcss'

export default <Partial<Config>>{
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './Layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      width: {
        82: '82px',
        80: '80px',
        56: '56px',
      },
      height: {
        82: '82px',
        80: '80px',
        56: '56px',
      },
      borderRadius: {
        10: '10px',
        20: '20px',
        60: '60px',
        82: '82px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
        screens: ['1224px'],
      },
      colors: {
        gray: {
          DEFAULT: '#D5D8E0',
          100: '#8B94A8',
          200: '#EFF0F2',
          300: '#AAB1BF',
          350: '#9099AB',
          400: '#E4E5E9',
          450: '#E3E5E8',
          500: '#F7F7F8',
          600: '#9099AB',
          700: '#F3F3F3',
        },
        primary: '#172A51',
        blue: {
          DEFAULT: '#4174F7',
          100: '#111E2B',
        },
        green: '#5EC445',
      },
      padding: {
        45: '45px',
        8: '32px',
      },
      margin: {
        52: '52px',
      },
      lineHeight: {
        130: '130%',
      },
      fontSize: {
        13: '13px',
        172: '172px',
        80: '80px',
      },
      boxShadow: {
        card: '0px 12px 40px 0px rgba(23, 42, 81, 0.08)',
        cardHover: '0px 12px 40px 0px rgba(23, 42, 81, 0.2)',
      },
      fontFamily: {
        Inter: 'Inter',
        Merriweather: 'Merriweather',
      },
    },
  },
  plugins: [],
}
