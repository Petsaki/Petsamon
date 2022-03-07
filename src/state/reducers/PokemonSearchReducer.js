const DefaultState = {
    loading: false,
    data: "",
    errorMsg: "",
  };
  
export const PokemonSearchReducer  = (state = DefaultState,action)=>{
    switch(action.type){
        case "ADD":
            return {
                ...state,
                data: action.payload,
              };
        default:
            return state
    }
}