const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
  };
  
export const PokemonInfoReducer  = (state = DefaultState,action)=>{
    switch(action.type){
        case "POKEMON-INFO":
            return {
                ...state,
                data: action.payload,
              };
        default:
            return state
    }
}