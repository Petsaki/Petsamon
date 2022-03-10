import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokeFont from "../components/PokeFont";
import { types } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { getPokemonInfo, getPokemonInfoLoading } from "../state/reducers/pokemonInfoAction";
import PokemonType from "../components/PokemonType";

const Pokemon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/");
  const [pokemonInfo, setPokemonInfo] = useState();
  const [loading,setLoading]=useState(true);
  // BugFix: Δεν δουλεύει με το local storage γιατί δεν είναι το data που αποθηκεύω.
  // Πρέπει να αλλάξω αυτό ή να αποθηκεύω στο local storage και το pokemonInfo(και να το αλλάξω στο PATHS)
  const typesData = types;
  let typeColors;

  useLayoutEffect(() => {
    const data = sessionStorage.getItem("pokemons-list");
    let dataToJSON = JSON.parse(data);
    const pikoulino = dataToJSON.find((pokemon) => pokemon.name === location[2]);
    console.log(pikoulino);
    if (pikoulino) {
      setPokemonInfo(pikoulino);
      dispatch(getPokemonInfo(pikoulino));
    } else {
      navigate("/notfound");
    }
    setTimeout(function(){
      setLoading(false)
    },1000)
    
  }, []);

  console.log("loading: "+ loading);
  if (loading) {
    return (
      <div className="flex items-center justify-center text-center">
        <h1>LOADING</h1>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md shadow-slate-400/70 p-3 mx-5">
      <div className="flex items-center justify-center text-center">
          <PokeFont text={pokemonInfo.name} />
      </div>
      <img
        className={`w-56 fixImfg flex aspect-square`}
        src={pokemonInfo.sprites.other["official-artwork"].front_default}
        alt={pokemonInfo.name} />
      <div className="flex items-center justify-center gap-4">
        {pokemonInfo.types.map((type, index) => {
          return <PokemonType type={type} key={index} />
        })}
      </div>
    </div>
  );
};

export default Pokemon;
