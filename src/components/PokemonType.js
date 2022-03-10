import React from "react";
import { types as typesData } from "../constants";

const PokemonType = ({ type }) => {
 
  return (
    <div
      className={`leading-none  cursor-pointer font-typesfont
        uppercase text-[14px] border-b-[3px] border-y-2 ${typesData[type.type.name].borderB} border-t-[2.5px]
        ${typesData[type.type.name].borderT} w-[92px] rounded-[6px] text-center pt-[6px] pb-[3px] ${typesData[type.type.name].bg} text-white relative `}
    >
      {/* Note: substring για να κόβω το string! */}
      <span className="relative z-20">
        {(type.type.name).substring(0, 6)}
      </span>
      <div className="absolute select-none -translate-y-full  translate-x-1/2 right-[46px] text-gray-600 ml-[1.7px] mt-[1.7px] font-bold">
        {(type.type.name).substring(0, 6)}
      </div>
    </div>
  );
};

export default PokemonType;
