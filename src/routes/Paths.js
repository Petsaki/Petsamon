import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonsList from "../components/PokemonsList";
import GenList from "../pages/GenList";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import Pokemon from "../pages/Pokemon";
import { pushPokemon } from "../state/action/pokemonsAction";

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
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* Note: Στην version 6 της React Router δεν χρειάζετε να βάζουμε το exact, ξέρει από μόνο του ποιο Route να διαλέξει! */}
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<PokemonsList />} />
          <Route path="/gen1" element={<GenList />} />
          <Route path="/gen2" element={<GenList />} />
          <Route path="/gen3" element={<GenList />} />
          <Route path="/pokemon/:pokemon" element={<Pokemon />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;
