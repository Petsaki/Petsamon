const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
  };
  

//   Note: Πλεον είναι useless αυτό το Reducer αλλά το κρατάω εάν το χρειαστώ στο μέλλον
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