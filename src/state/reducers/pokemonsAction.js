export const pushPokemon = (pokemonData) => {
    return (dispatch) => {
        dispatch({
            type: "PUSH",
            payload: pokemonData
        });
    }
}