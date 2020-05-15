module.exports = {
  theme: {
    screens: {
      smm: '375px', 
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    borderRadius:{
      'lg': '5rem'
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    extend: {
      colors: {
        'primary': '#292929',
        'secondary': '#1F1F1F',
        'input': '#3C3C3C',
        'blue': '#007EF4',
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      }
    }
  }
}
            