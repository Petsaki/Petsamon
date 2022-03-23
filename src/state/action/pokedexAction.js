export const updatePokedex = (pokedex) => {
    return (dispatch) => {
        dispatch({
            type: "POKEDEX",
            payload: pokedex
        });
    }
}