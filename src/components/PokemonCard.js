import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { letters } from "../constants";
import { ReactComponent as Pikachu } from "../images/pikachu.svg";
import { getPokemonInfo } from "../state/reducers/pokemonInfoAction";
import PokeFont from "./PokeFont";

const PokemonCard = ({ pokeInfo }) => {
  const [loading, setLoading] = useState(false);
  const testing = "block";
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <Link
        className={` bg-white flex flex-col items-center rounded-lg shadow-md shadow-slate-400/70 p-3
      transition ease-out .4s
      group hover:scale-125 focus:scale-125 hover:z-20 focus:z-20
      `}
        to={"/pokemon/" + pokeInfo?.name}
        onClick={() => {
          dispatch(getPokemonInfo(pokeInfo));
        }}
      >
        {/* Note: Προσοχή επειδή έχει - το βλέπει σαν μεταβλητή το artwork και για αυτό το έκανα.
            Δες για Object property accessors γιατί */}
        <div
          className="transition ease-out .4s group-hover:scale-[65%] group-hover:-translate-y-7
        group-focus:scale-[65%] group-focus:-translate-y-7"
        >
          <img
            className={`w-36 fixImfg hidden` + (loading ? "flex" : "hidden")}
            src={pokeInfo?.sprites?.other["official-artwork"].front_default}
            onLoad={() => {
              setLoading(true);
            }}
          />
        </div>

        <PokeFont text={pokeInfo?.name} />
      </Link>

      {/* <div
        className={` ${testing} bg-white border-white flex flex-col items-center border-[1.5px] rounded-lg shadow-lg shadow-gray-400 p-3 absolute top-0 left-0 w-full z-50`}
      >
        <Pikachu className="w-[120px] h-[120px] animate-pulse" />
        <div className="skeleton w-24 h-4 mt-4">
        </div>
        <div className="skeleton w-36 h-2 mt-4"></div>
      </div> */}
    </div>
  );
};

export default PokemonCard;
