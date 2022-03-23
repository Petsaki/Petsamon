const DefaultState = {
    data: [],
    errorMsg: "",
  };
  
export const PokedexReducer  = (state = DefaultState,action)=>{
    switch(action.type){
        case "POKEDEX":
            return {
                ...state,
                data: action.payload,
              };
        default:
            return state
    }
}