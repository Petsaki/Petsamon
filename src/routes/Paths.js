import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonsList from "../components/PokemonsList";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import Pokemon from "../pages/Pokemon";
import { pushPokemon } from "../state/reducers/pokemonsAction";
import CheckPokemon from "./CheckPokemon";

const Paths = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const data = sessionStorage.getItem("pokemons-list");
    if (data) {
      let dataToJSON = JSON.parse(data);
      for (let i = dataToJSON.length; i--; ) {
        dispatch(pushPokemon(dataToJSON[i]));
      }
    }
  }, []);

  return (
    <div>
      {/* Note: Στην version 6 της React Router δεν χρειάζετε να βάζουμε το exact, ξέρει από μόνο του ποιο Route να διαλέξει! */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
          <Route index element={<PokemonsList />}/>
            <Route element={<CheckPokemon />}>
              <Route path="/pokemon/:pokemon" element={<Pokemon />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Paths;
