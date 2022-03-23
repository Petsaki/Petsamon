const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
};

const GenReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "POKEMON_LIST_LOADING":
      return {
        data: [],
        loading: true,
        errorMsg: "",
      };
    case "POKEMON_LIST_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        errorMsg: "",
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

export default GenReducer;
