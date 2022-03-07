const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
};

const PokemonReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "POKEMON_LIST_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "POKEMON_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "POKEMON_LIST_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Can't found the pokemons",
      };
    default:
      return state;
  }
};

export default PokemonReducer;
