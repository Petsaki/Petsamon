export const updatePokemon = (pokemon) => {
    return (dispatch) => {
        dispatch({
            type: "ADD",
            payload: pokemon
        });
    }
}