import { combineReducers } from "redux";
import GenReducer from "./reducers/GenReducer";
import { PokemonInfoReducer } from "./reducers/PokemonInfoReducer";
import { PokemonsReducer } from "./reducers/PokemonsReducer";
import storageSession from "redux-persist/lib/storage/session";
import { PokedexReducer } from "./reducers/PokedexReducer";

export const RootReducer = combineReducers({
  Gen: GenReducer,
  Pokedex: PokedexReducer,
  Pokemons: PokemonsReducer,
  PokemonInfo: PokemonInfoReducer,
});

export const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ['Pokemons','Pokedex','PokemonInfo']
};

