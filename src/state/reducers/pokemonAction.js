export const GetPokemonList = (pokemon) => async (dispatch) => {
  try {
    dispatch({
      type: "POKEMON_LIST_LOADING",
    });

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await res.json();

    dispatch({
      type: "POKEMON_LIST_SUCCESS",
      payload: data
    });
    
  } catch (e) {
    dispatch({
      type: "POKEMON_LIST_FAIL",
    });
  }
};
