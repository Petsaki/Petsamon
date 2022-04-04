import React, { useState } from "react";
import { Link } from "react-router-dom";
import PokeFont from "./PokeFont";
import PokemonType from "./PokemonType";
import { ReactComponent as Pikachu } from "../images/pikachu.svg";
import { useDispatch } from "react-redux";
import { getPokemonInfo } from "../state/action/pokemonInfoAction";

const PokemonCard = ({ pokeInfo }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const testing ="hidden"

  return (
    <div className="relative">
      <Link
      // Note: SUPER SOS SOS SOS το css will-change κάνει optimaze αυτό που θα πεις ότι κάνει το element π.χ. transform και έτσι σταμάτησε να κάνει άσκοπα re-renderings!!!
        className={`will-change-transform
        cursor-pointer overflow-hidden bg-white flex flex-col items-center rounded-lg shadow-md shadow-slate-400/70 p-3
      transition ease-out .4s
      group  md:hover:scale-[115%] md:focus:scale-[115%] md:hover:z-20 md:focus:z-20 
      group  lg:hover:scale-125 lg:focus:scale-125 lg:hover:z-20 lg:focus:z-20 
      `}
        to={"/pokemon/" + pokeInfo.name}
        onClick={() => dispatch(getPokemonInfo(pokeInfo))}
      >
        {/* <div className="absolute top-2 right-3 leading-none">Legendary O</div> */}
        <div
          className="transition md:group-hover:scale-[75%] md:group-hover:-translate-y-6 md:will-change-transform
          md:group-focus:scale-[75%] md:group-focus:-translate-y-6 lg:group-hover:scale-[65%] lg:group-hover:-translate-y-7 lg:group-focus:scale-[65%] lg:group-focus:-translate-y-7"
        >
          {/* Note: Προσοχή επειδή έχει - το βλέπει σαν μεταβλητή το artwork και για αυτό το έκανα.
            Δες για Object property accessors γιατί */}
          <img
            alt={pokeInfo.name}
            className={`w-36 md:w-28 lg:w-36 fixImfg hidden` + (loaded ? "hidden" : "flex")}
            src={pokeInfo.sprites.other["official-artwork"].front_default}
            onLoad={() => {
              setLoaded(true);
            }}
          />
        </div>
        <div
          className=" transition flex gap-4 md:absolute scale-[70%] bottom-5 md:opacity-0 md:group-hover:scale-[60%] md:group-hover:-translate-y-5
          md:group-focus:-translate-y-5 md:group-hover:opacity-100 md:group-focus:opacity-100 lg:group-hover:scale-[70%] lg:group-hover:-translate-y-8 lg:group-focus:-translate-y-8"
        >
          {pokeInfo.types.map((type,index) => {
            return <PokemonType key={pokeInfo.name + index} type={type} />;
          })}
        </div>
          <div className="will-change-transform">
          <PokeFont  text={pokeInfo.name} />
          </div>
        
      </Link>

      <div
        className={`${loaded ? "hidden" : "block" } bg-white border-white flex flex-col items-center border-[1.5px] rounded-lg shadow-lg shadow-gray-400 p-3 absolute top-0 left-0 w-full h-full z-10`}
      >
        <Pikachu className="w-36 animate-pulse" />
        <div className="skeleton w-24 h-4 mt-4">
        </div>
      </div>

      {/* <div
        className={`${loaded ? "hidden" : "block" } bg-white border-white flex flex-col items-center border-[1.5px] rounded-lg shadow-lg shadow-gray-400 p-3 absolute top-0 left-0 w-full h-full z-10`}
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
