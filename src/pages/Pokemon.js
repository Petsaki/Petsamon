import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokeFont from "../components/PokeFont";
import { useLocation, useNavigate } from "react-router-dom";
import { getPokemonInfo } from "../state/action/pokemonInfoAction";
import PokemonType from "../components/PokemonType";

const Pokemon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/");
  const [pokemonInfo, setPokemonInfo] = useState();
  const [loading, setLoading] = useState(true);
  const PokemonsList = useSelector((state) => state.Pokemons.data);
  const GetPokemonInfo = useSelector((state) => state.PokemonInfo.data);
  // BugFix: Δεν δουλεύει με το local storage γιατί δεν είναι το data που αποθηκεύω.
  // Πρέπει να αλλάξω αυτό ή να αποθηκεύω στο local storage και το pokemonInfo(και να το αλλάξω στο PATHS)

  useLayoutEffect(() => {
    console.log(GetPokemonInfo.name);
    const pikoulino = PokemonsList.find(
      (pokemon) => pokemon.name === location[2]
    );
    if (GetPokemonInfo.name === location[2]) {
      setPokemonInfo(GetPokemonInfo);
    } else if (pikoulino) {
      setPokemonInfo(pikoulino);
      // BugFix: Εδώ μπορώ να κάνω fetch εάν τελικά δεν το βρει κάπου!!!
    } else {
      navigate("/notfound");
    }

    // console.log(pikoulino);
    // if (pikoulino) {
    //   setPokemonInfo(pikoulino);
    //   // dispatch(getPokemonInfo(pikoulino));
    // } else {

    // }
 
    // setTimeout(function () {
    //   setLoading(false);
    // }, 1000);
  }, []);

  // console.log("loading: " + loading);
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center text-center">
  //       <h1>LOADING</h1>
  //     </div>
  //   );
  // }


  return (
    <div className="mx-auto max-w-screen-2xl ">
      <div className="bg-white rounded-lg shadow-md shadow-slate-400/70 px-4 md:px-12 mx-2 sm:mx-6 ">

        {pokemonInfo && (
          <div className="flex flex-wrap">

            {/* ---------------------- Pokemon Image -------------------------------- */}
            <div className="mx-auto mt-6 mb-4">
              <div className=" mx-auto scale-[175%] mt-2 mb-8 w-fit ">
                <PokeFont text={pokemonInfo.name} />
              </div>
              <img
                className={`w-[475px]`}
                src={pokemonInfo.sprites.other["official-artwork"].front_default}
                alt={pokemonInfo.name}
              />
            </div>


            {/* -------------------- POKEDEX TABLE -------------------------------------------- */}
            <div className="flex-grow min-w-full sm:min-w-[386px] mt-6 mb-4">
              {/* Note: τα h1,h2...,h6 είναι unstyled στην tailwind! */}
              <h1 className="font-sans font-bold text-4xl flex justify-center">
                Pok&#233;dex data
              </h1>
              <table className="table-stats">
                <tbody>
                <tr className="tr-stats">
                  <th className="th-stats">National &#8470;</th>
                  <td className="td-stats font-bold">{pokemonInfo.id}</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats  min-w-full">Type</th>
                  <td className="td-stats  min-w-full">
                    <div className="flex flex-col sm:flex-row gap-y-2 justify-start scale-[82%] origin-left cursor-default gap-x-3">
                      {pokemonInfo.types.map((type, index) => {
                        return <PokemonType type={type} key={index} />;
                      })}
                    </div>
                  </td>
                </tr>
                {/* <tr className="tr-stats">
                  <th className="th-stats">Species</th>
                  <td className="td-stats">at pokemon-species.genera.7</td>
                </tr> */}
                              <tr className="tr-stats">
                  <th className="th-stats">Base Exp.</th>
                  <td className="td-stats">{pokemonInfo.base_experience}</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Weight</th>
                  <td className="td-stats">{pokemonInfo.weight / 10} kg</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Height</th>
                  <td className="td-stats">{pokemonInfo.height / 10} m</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Abilities</th>
                    <td className="td-stats">
                      <div>
                        {pokemonInfo.abilities.map((ability,index) =>{
                          if (ability.is_hidden){
                            return <p key={index} className="text-base">{ability.ability.name} <span className="text-sm text-neutral-500">(hidden ability)</span></p>
                          }else{
                          return <p key={index}>{index + 1}. {ability.ability.name}</p>
                          }
                        })}
                      </div>
                    </td>
                </tr>
                </tbody>
              </table>
            </div>



            {/* -------------------- BASE STATS TABLE -------------------------------------------- */}

            <div className="flex-grow min-w-full md:min-w-[386px] mt-6 mb-4">
              {/* Note: τα h1,h2...,h6 είναι unstyled στην tailwind! */}
              <h1 className="font-sans font-bold text-4xl flex justify-center">
                Base stats
              </h1>
              <table className="table-stats">
                <tbody>
                <tr className="tr-stats">
                  <th className="th-stats">HP</th>
                  <td className="td-stats">{pokemonInfo.stats[0].base_stat}</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Attack</th>
                  <td className="td-stats">
                  {pokemonInfo.stats[1].base_stat}
                  </td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Defense</th>
                  <td className="td-stats">{pokemonInfo.stats[2].base_stat}</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Sp. Atk</th>
                  <td className="td-stats">{pokemonInfo.stats[3].base_stat}</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Sp. Def</th>
                  <td className="td-stats">{pokemonInfo.stats[4].base_stat}</td>
                </tr>
                <tr className="tr-stats">
                  <th className="th-stats">Speed</th>
                  <td className="td-stats">{pokemonInfo.stats[5].base_stat}</td>
                </tr>
                </tbody>
              </table>
            </div>
            </div>
        )}
        
      </div>
    </div>
  );
};

export default Pokemon;
