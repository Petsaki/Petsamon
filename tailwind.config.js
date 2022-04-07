module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily:{
        pokemon:['PokemonSolid'],
        // Note: Jesus Christ ήθελε αντί για [] αυτάκια""....
        typesfont:"'Press Start 2P'",
      },
      keyframes: {
        getBig: {
          'from': { transform: 'scale(1)' },
          'to': { transform: 'scale(1.2)' },
        },
        toastFrameRight: {
          '0% , 100%': { transform: 'translateX(-100%)' },
          '5% , 95%': { transform: 'translateX(0%)'}
        },
        toastFrameUp:{
          '0% , 100%': { transform: 'translateY(200%)' },
          '5% , 95%': { transform: 'translateY(0%)'}
        }
      },
      animation: {
        'grow': 'getBig .35s ease-out forwards ',
        'toastAniMD': 'toastFrameRight 4s ease-out forwards ',
        'toastAniSM': 'toastFrameUp 4s ease-out forwards '
      },
      gridTemplateColumns: {
        'repeat': 'repeat(auto-fit, 220px)',
        'cards5': 'repeat(5, 220px)',
        'cards4small': 'repeat(4, 165px)',
        'cards4': 'repeat(4, 220px)'
      },

    },
  },
  plugins: [],
}