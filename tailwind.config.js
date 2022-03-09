module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
        }
      },
      animation: {
        'grow': 'getBig .35s ease-out forwards',
      },
      gridTemplateColumns: {
        'repeat': 'repeat(auto-fit, 220px)'
      }
    },
  },
  plugins: [],
}