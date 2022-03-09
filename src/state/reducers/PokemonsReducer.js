const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
  };
  
export const PokemonsReducer  = (state = DefaultState,action)=>{
    switch(action.type){
        case "PUSH":
            return {
                ...state,
                data: [action.payload,...state.data],
              };
        default:
            return state
    }
}