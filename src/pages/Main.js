import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PokeFont from "../components/PokeFont";

const Main = () => {

  // useEffect(() => {
  //   const data = localStorage.getItem("pokemons-list");
  //   if (data) {
  //     let dataToJSON = JSON.parse(data)
  //     console.log("LOCAL STORAGE: " + JSON.parse(data));
  //     for (let i = dataToJSON.length; i--;) {
  //       console.log("EVERY POKEMON AT LOCAL STORAGE: " + dataToJSON[i])

  //       dispatch(pushPokemon(dataToJSON[i]));
  //     }
  //   }
  // }, []);

  //Note: sessionStorage είναι ΙΔΙΟ (ΑΚΟΜΑ ΚΑΙ ΤΟ API) με την διαφορά ότι το sessionStorage διαγράφεται όταν κλείσει το tab or broswer
  // useEffect(() => {
  //   console.log("Pokemons: " + PokemonsList.length);
  //   if (PokemonsList.length > 0) {
  //     // BugFix: Έχει θέμα με το storage γιατί έχει limit. Σίγουρα θα έχω limit για τα πόσα πόκεμον θα έχει εκεί.Ίσως να κόβω και περριτά data που δεν τα κάνω τίποτα!
  //     sessionStorage.setItem("pokemons-list", JSON.stringify(PokemonsList));
  //   }
  // }, [PokemonsList]);

  return (
    // BugFix: Μεγάλο θέμα με τα re-rendering. Φταίει το z-index!! Δες στο PokemonCard και Header
    <div className="bg-slate-200/80 min-h-screen sm:pb-6">
      <Header />
      <div className="flex items-center justify-center my-8">
        <PokeFont text={"Gotta catch them all!"} />
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
