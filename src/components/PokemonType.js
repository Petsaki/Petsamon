import React from "react";
import { types } from "../constants";

const PokemonType = ({ type }) => {
  const typesData = types;
  let typeColors;
  
  for (let typeData in typesData) {
    if (type.type.name === typeData) {
        typeColors = typesData[typeData];
    }
  }
  return (
    <div
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
};

export default PokemonType;
