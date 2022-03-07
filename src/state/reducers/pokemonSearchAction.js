export const updatePokemon = (pokemon) => {
    console.log(pokemon)
    return (dispatch) => {
        dispatch({
            type: "ADD",
            payload: pokemon
        });
    }
}