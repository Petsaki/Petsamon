import React from "react";
import { useSelector } from "react-redux";
import PokeFont from "../components/PokeFont";
import { types } from "../constants";

const Pokemon = () => {

  // BugFix: Δεν δουλεύει με το local storage γιατί δεν είναι το data που αποθηκεύω.
  // Πρέπει να αλλάξω αυτό ή να αποθηκεύω στο local storage και το pokemonInfo(και να το αλλάξω στο PATHS)
  const PokemonsInfo = useSelector((state) => state.PokemonInfo.data);

  const typesData = types;
  let typeColors;

  return (
    <div className="bg-white rounded-lg shadow-md shadow-slate-400/70 p-3 mx-5">
      <div className="flex items-center justify-center text-center">
        <PokeFont text={PokemonsInfo.name} />
      </div>

      <img
        className={`w-56 fixImfg flex aspect-square`}
        src={PokemonsInfo.sprites.other["official-artwork"].front_default}
        alt={PokemonsInfo.name}
      />

      <div className="flex items-center justify-center gap-4">
        {PokemonsInfo.types.map((type, index) => {
          for (let typeData in typesData) {
            if (type.type.name === typeData) {
              typeColors = typesData[typeData];
              break
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
      </div>
    </div>
  );
};

export default Pokemon;
