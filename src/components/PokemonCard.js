import React, { useState } from "react";
import { Link } from "react-router-dom";
import PokeFont from "./PokeFont";
import PokemonType from "./PokemonType";
import { ReactComponent as Pikachu } from "../images/pikachu.svg";
import { useDispatch } from "react-redux";
import { getPokemonInfo } from "../state/action/pokemonInfoAction";

const PokemonCard = ({ pokeInfo }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const testing ="block"

  return (
    <div className="">
      <Link
      // Note: SUPER SOS SOS SOS το css will-change κάνει optimaze αυτό που θα πεις ότι κάνει το element π.χ. transform και έτσι σταμάτησε να κάνει άσκοπα re-renderings!!!
        className={`relative will-change-transform
        cursor-pointer overflow-hidden bg-white flex flex-col items-center rounded-lg shadow-md shadow-slate-400/70 p-3
      transition ease-out .4s
      group hover:scale-110 focus:scale-110 sm:hover:scale-125 sm:focus:scale-125 hover:z-20 focus:z-20
      `}
        to={"/pokemon/" + pokeInfo.name}
        onClick={() => dispatch(getPokemonInfo(pokeInfo))}
      >
        {/* <div className="absolute top-2 right-3 leading-none">Legendary O</div> */}
        <div
          className="transition group-hover:scale-[65%] group-hover:-translate-y-7 will-change-transform
        group-focus:scale-[65%] group-focus:-translate-y-7"
        >
          {/* Note: Προσοχή επειδή έχει - το βλέπει σαν μεταβλητή το artwork και για αυτό το έκανα.
            Δες για Object property accessors γιατί */}
          <img
            alt={pokeInfo.name}
            className={`w-36 fixImfg hidden` + (loading ? "flex" : "hidden")}
            src={pokeInfo.sprites.other["official-artwork"].front_default}
            onLoad={() => {
              setLoading(true);
            }}
          />
        </div>
        <div
          className=" transition flex gap-4 absolute scale-[70%] bottom-5 opacity-0 group-hover:scale-[70%] group-hover:-translate-y-8
        group-focus:-translate-y-8 group-hover:opacity-100 group-focus:opacity-100"
        >
          {pokeInfo.types.map((type,index) => {
            return <PokemonType key={pokeInfo.name + index} type={type} />;
          })}
        </div>
          <div className="will-change-transform">
          <PokeFont  text={pokeInfo.name} />
          </div>
        
      </Link>

      {/* <div
        className={` ${testing} bg-white border-white flex flex-col items-center border-[1.5px] rounded-lg shadow-lg shadow-gray-400 p-3 absolute top-0 left-0 w-full h-full z-10`}
      >
        <Pikachu className="w-36 animate-pulse" />
        <div className="skeleton w-24 h-4 mt-4">
        </div>
        <div className="skeleton w-36 h-2 mt-4"></div>
      </div> */}
    </div>
  );
};

export default PokemonCard;
