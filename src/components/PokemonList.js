import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemonList } from "../state/reducers/pokemonAction";

const PokemonList = () => {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  useEffect(()=>{
    FetchData("abra")
  },[])

  const FetchData = (pokemon = "abra") =>{
      dispatch(GetPokemonList(pokemon))
  }

  const ShowData = () => {
      console.log(pokemonList.data)
          return <h1>all good</h1>
  }

  return (
    <div className="flex items-center justify-center my-5 border-2 border-slate-800">
      {ShowData()}
    </div>
  );
};

export default PokemonList;
