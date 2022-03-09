import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getPokemonInfo } from "../state/reducers/pokemonInfoAction";
import { pushPokemon } from "../state/reducers/pokemonsAction";

const CheckPokemon = () => {
  const location = useLocation().pathname.split("/");
  const dispatch = useDispatch();

  const PokemonsList = useSelector((state) => state.Pokemons.data);

  
  // BugFix: Όταν υπάρχει το ποκεμον αλλά πάω στο path χειροκίνητα με πετάει στο not found page
  // επειδή χάνοντε όλα τα state του redux, μάλλον θέλει local storage ή cookies για να τα κρατάει.
  const pokemoncheck = () => {

    let pokemonExists = false;

    //Note: Ίσως να το βσήσω όλο αυτό το for loop για το Local storage
    const data = sessionStorage.getItem("pokemons-list");
    let dataToJSON = JSON.parse(data);
    for (let i = dataToJSON.length; i--; ) {
      if (location.includes(dataToJSON[i].name)) {;
        pokemonExists = true;
        dispatch(getPokemonInfo(dataToJSON[i]));
        break;
      }

    }
    // Note: Η for in loop το pokemon είναι η θέση του PokemonList(δεν είναι όπως την map)
    // for (const pokemon in PokemonsList) {
    //   console.log(PokemonsList[pokemon].name);
    //   if (location.includes(PokemonsList[pokemon].name)) {
    //     pokemonExists.exists = true;
    //     break;
    //   }
    // }
    return pokemonExists
  };
  return pokemoncheck() ? <Outlet /> : <Navigate replace to="/notFound" />;
};

export default CheckPokemon;
