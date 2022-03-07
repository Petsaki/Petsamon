import { combineReducers } from "@reduxjs/toolkit";
import PokemonReducer from "./reducers/PokemonReducer";
import { PokemonSearchReducer } from "./reducers/PokemonSearchReducer";

const RootReducer = combineReducers({
    PokemonList: PokemonReducer,
    PokemonSearch: PokemonSearchReducer,
});

export default RootReducer;
