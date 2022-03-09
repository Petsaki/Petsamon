import { combineReducers } from "@reduxjs/toolkit";
import { PokemonInfoReducer } from "./reducers/PokemonInfoReducer";
import PokemonReducer from "./reducers/PokemonReducer";
import { PokemonSearchReducer } from "./reducers/PokemonSearchReducer";
import { PokemonsReducer } from "./reducers/PokemonsReducer";

const RootReducer = combineReducers({
    PokemonList: PokemonReducer,
    PokemonSearch: PokemonSearchReducer,
    Pokemons: PokemonsReducer,
    PokemonInfo : PokemonInfoReducer,
});

export default RootReducer;
