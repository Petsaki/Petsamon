import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PokeFont from "../components/PokeFont";
import PokemonCard from "../components/PokemonCard";
 
import { letters } from "../constants";
import { ReactComponent as SearchIcon } from "../images/search_black_24dp.svg";
import { GetPokemonList } from "../state/reducers/pokemonAction";
import { pushPokemon } from "../state/reducers/pokemonsAction";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
 
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  const PokemonsList = useSelector((state) => state.Pokemons.data);

  // useEffect(() => {
  //   const data = localStorage.getItem("pokemons-list");
  //   if (data) {
  //     let dataToJSON = JSON.parse(data)
  //     console.log("LOCAL STORAGE: " + JSON.parse(data));
  //     for (let i = dataToJSON.length; i--;) {
  //       console.log("EVERY POKEMON AT LOCAL STORAGE: " + dataToJSON[i])
        
  //       dispatch(pushPokemon(dataToJSON[i]));
  //     }
  //   }
  // }, []);


  //Note: sessionStorage είναι ΙΔΙΟ (ΑΚΟΜΑ ΚΑΙ ΤΟ API) με την διαφορά ότι το sessionStorage διαγράφεται όταν κλείσει το tab or broswer
  useEffect(() => {
    console.log("Pokemons: " + PokemonsList.length);
    if (PokemonsList.length>0) {
      sessionStorage.setItem("pokemons-list", JSON.stringify(PokemonsList));
    }
  }, [PokemonsList]);

  // useEffect(() => {
  //   FetchData("abra");
  // }, []);

  const FetchData = (pokemon = "abra") => {
    dispatch(GetPokemonList(pokemon));
  };

  const ShowData = () => {
    return <PokemonCard pokeInfo={pokemonList.data} />;
  };

  const SearchPokemon = useSelector((state) => state.PokemonSearch.data);

  const listOfPokemons = () => {
    const names = PokemonsList.map((pokemon) => {
      return pokemon.name;
    });
    return names;
  };

  useEffect(async () => {
    if (!(SearchPokemon == "") && !listOfPokemons().includes(SearchPokemon)) {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${SearchPokemon}`
      );
      const data = await res.json();

      dispatch(pushPokemon(data));

      console.log("pokemon on UseEffect: " + PokemonsList.length);
      // setPokemons((prevPokemon) => {
      //   // Note: Για να βάζω τα καινούργια αντικείμενα στην αρχή, αλλιώς [...prevPokemon, data]
      //   // BugFix: Για κάποιο λόγο επειδή βάζω το data στην αρχή, όταν κάνει load δείχνει την εικόνα του προηγούμενου pokemon και μετά του σωστού
      //   return [data, ...prevPokemon];

      // });
      console.log(data);
    }

    // Feature: Εάν υπάρχει μέσα στον πίνακα τότε να το βάζω στην πρώτη θέση
    // else if (!(inputValue == "") && listOfPokemons().includes(inputValue)) {

    //   if (listOfPokemons().indexOf(inputValue) > 0) {

    //     let removeItemIndex = listOfPokemons().indexOf(inputValue,1);
    //     console.log(removeItemIndex);
    //     setPokemons((prevPokemon) => {

    //       let removedItem = prevPokemon[removeItemIndex]
    //       // setTimeout(prevPokemon.splice(removeItemIndex, 1),2000)
    //       // console.log(prevPokemon.splice(removeItemIndex, 1))
    //       // prevPokemon.splice(removeItemIndex, 1)
    //       console.log(prevPokemon)
    //       return [removedItem, ...prevPokemon];
    //     });
    //   }
    // }
  }, [SearchPokemon]);

  // NOTE: Αυτό κάνει το ίδιο με το κάτω αλλά στο onclick καλό το setPokemon
  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPokemon(inputValue);
  //       console.log(data);
  //     });
  // }, [pokemon]);

  // test.split('').forEach(element => {
  //   if (fwnienta.includes(element.toLowerCase())){
  //     console.log(element);
  //   }else{
  //     console.log("no");
  //   }

  // });
  return (
    // BugFix: Μεγάλο θέμα με τα re-rendering. Φταίει το z-index!! Δες στο PokemonCard και Header
    <div className="bg-slate-200/80 min-h-screen">
      <Header />
      <div className="flex items-center justify-center my-8">
        <PokeFont text={"Gotta catch them all!"} />
      </div>

      {/* <PokemonList /> */}
      <Outlet />
      {/* <div className="pb-10 pt-6"> */}
      {/* Note: Εδώ ήθελε grid γιατί ήταν ΠΟΛΎ πιο εύκολο από'τι το flex */}
      {/* <div className="grid justify-center grid-cols-repeat gap-x-8 gap-y-9  m-8">
          {PokemonsList.length > 0
            ? PokemonsList.map((pokemon, index) => {
                return <PokemonCard key={index} pokeInfo={pokemon} />;
              })
            : null}
        </div>
      </div> */}
      {/* {ShowData()} */}
    </div>
  );
};

export default Main;
