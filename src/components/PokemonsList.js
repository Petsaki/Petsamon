import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushPokemon } from "../state/reducers/pokemonsAction";
import PokemonCard from "./PokemonCard";

const PokemonsList = () => {
  const dispatch = useDispatch();
  const PokemonsList = useSelector((state) => state.Pokemons.data);

  // useEffect(() => {
  //   const data = localStorage.getItem("pokemons-list");
  //   if (data) {
  //       console.log("LOCAL STORAGE: " + JSON.parse(data));
  //       // dispatch(pushPokemon(data[pokemon]));
  //   }
  // }, []);

  return (
    <div className="pb-10 pt-6">
      {/* Note: Εδώ ήθελε grid γιατί ήταν ΠΟΛΎ πιο εύκολο από'τι το flex */}
      <div className="grid justify-center grid-cols-repeat gap-x-8 gap-y-9  m-8">
        {PokemonsList.length > 0
          ? PokemonsList.map((pokemon, index) => {
              return <PokemonCard key={index} pokeInfo={pokemon} />;
            })
          : null}
      </div>
    </div>
  );
};

export default PokemonsList;
