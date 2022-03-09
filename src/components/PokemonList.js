import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemonList } from "../state/reducers/pokemonAction";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  // const dispatch = useDispatch();
  // const pokemonList = useSelector((state) => state.PokemonList);

  // useEffect(()=>{
  //   FetchData("abra")
  // },[])

  // const FetchData = (pokemon = "abra") =>{
  //     dispatch(GetPokemonList(pokemon))
  // }

  // const ShowData = () => {
  //     console.log(pokemonList.data)
  //         return <h1>all good</h1>
  // }

  return (
    // <div className="flex items-center justify-center my-5 border-2 border-slate-800">
    //   {ShowData()}
    // </div>
    <div>
      {/* Note: Εδώ ήθελε grid γιατί ήταν ΠΟΛΎ πιο εύκολο από'τι το flex
      <div className="grid justify-center grid-cols-repeat gap-x-8 gap-y-9  m-8">
        {pokemons.length > 0
          ? pokemons.map((pokemon, index) => {
              return <PokemonCard key={index} pokeInfo={pokemon} />;
            })
          : null}
      </div> */}
    </div>
  );
};

export default PokemonList;
