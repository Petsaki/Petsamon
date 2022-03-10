import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokeFont from "../components/PokeFont";
import { types } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { getPokemonInfo, getPokemonInfoLoading } from "../state/reducers/pokemonInfoAction";

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
  // if (loading) {
  //   console.log("RETURN NULL")
  //   return null;
  // }

  return (
    <div className="bg-white rounded-lg shadow-md shadow-slate-400/70 p-3 mx-5">


      {loading ?(
        <div className="flex items-center justify-center text-center">
          <h1>LOADING</h1>
          </div>
      ):(
        <><div className="flex items-center justify-center text-center">
            <PokeFont text={pokemonInfo.name} />
          </div><img
              className={`w-56 fixImfg flex aspect-square`}
              src={pokemonInfo.sprites.other["official-artwork"].front_default}
              alt={pokemonInfo.name} /><div className="flex items-center justify-center gap-4">
              {pokemonInfo.types.map((type, index) => {
                for (let typeData in typesData) {
                  if (type.type.name === typeData) {
                    typeColors = typesData[typeData];
                    break;
                  }
                }
                return (
                  <div
                    key={index}
                    className={`leading-none  cursor-pointer font-typesfont
              uppercase text-[14px] border-b-[3px] border-y-2 ${typeColors.borderB} border-t-[2.5px]
              ${typeColors.borderT} w-[92px] rounded-[6px] text-center pt-[6px] pb-[3px] ${typeColors.bg} text-white relative `}
                  >
                    {/* Note: substring για να κόβω το string! */}
                    <span className="relative z-20">
                      {(type?.type?.name).substring(0, 6)}
                    </span>
                    <div className="absolute select-none -translate-y-full  translate-x-1/2 right-[46px] text-gray-600 ml-[1.7px] mt-[1.7px] font-bold">
                      {(type?.type?.name).substring(0, 6)}
                    </div>
                  </div>
                );
              })}
            </div></>
      )}
      
    </div>
  );
};

export default Pokemon;
