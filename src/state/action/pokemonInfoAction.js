export const getPokemonInfo = (pokemonInfo) => {
    return (dispatch) => {
        dispatch({
            type: "POKEMON-INFO",
            payload: pokemonInfo
        });
    }
}