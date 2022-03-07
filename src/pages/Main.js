import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import PokemonCard from '../components/PokemonCard';
import PokemonList from '../components/PokemonList';
import { letters } from '../constants';
import {ReactComponent as SearchIcon} from '../images/search_black_24dp.svg';
import { GetPokemonList } from '../state/reducers/pokemonAction';

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const test = "Gotta catch them all!";
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  useEffect(()=>{
    FetchData("abra")
  },[])

  const FetchData = (pokemon = "abra") =>{
      dispatch(GetPokemonList(pokemon))
  }

  const ShowData = () => {
          return <PokemonCard pokeInfo={pokemonList.data} />
  }

  const SearchPokemon = useSelector((state) => state.PokemonSearch.data)

  const listOfPokemons = () => {
    const names = pokemons.map((pokemon) => {
      return pokemon.name;
    });
    return names;
  };


  useEffect( async () =>{
        if (!(SearchPokemon == "") && !listOfPokemons().includes(SearchPokemon)) {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${SearchPokemon}`
      );
      const data = await res.json();
      setPokemons((prevPokemon) => {
        // Note: Για να βάζω τα καινούργια αντικείμενα στην αρχή, αλλιώς [...prevPokemon, data]
        // BugFix: Για κάποιο λόγο επειδή βάζω το data στην αρχή, όταν κάνει load δείχνει την εικόνα του προηγούμενου pokemon και μετά του σωστού
        return [data, ...prevPokemon];
      });
      console.log(data);
    }
  },[SearchPokemon])

  // NOTE: Αυτό κάνει το ίδιο με το κάτω αλλά στο onclick καλό το setPokemon
  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPokemon(inputValue);
  //       console.log(data);
  //     });
  // }, [pokemon]);

  const getPokemon = async (e) => {
    //Note: Για να μην σε πηγαίνει σε άλλο url το form onSubmit!!SOS
    e.preventDefault();

    if (!(inputValue === "") && !listOfPokemons().includes(inputValue)) {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputValue}`
      );
      const data = await res.json();
      setPokemons((prevPokemon) => {
        // Note: Για να βάζω τα καινούργια αντικείμενα στην αρχή, αλλιώς [...prevPokemon, data]
        // BugFix: Για κάποιο λόγο επειδή βάζω το data στην αρχή, όταν κάνει load δείχνει την εικόνα του προηγούμενου pokemon και μετά του σωστού
        return [data, ...prevPokemon];
      });
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
  };

  // test.split('').forEach(element => {
  //   if (fwnienta.includes(element.toLowerCase())){
  //     console.log(element);
  //   }else{
  //     console.log("no");
  //   }

  // });
  return (
    // BugFix: Μεγάλο θέμα με τα re-rendering. Φταίει το z-index!! Δες στο PokemonCard και Header
    <div className='bg-slate-100 h-screen'>
    <Header/>
    {/* <PokemonList/> */}
    <Outlet/>
    <div className="pb-10">
      {/* Note: Μπορώ είτε να κάνω onSubmit ή Onclick στο button */}
      {/* <form  className="flex items-center m-5 gap-5"> */}
      <form
        onSubmit={(e) => getPokemon(e)}
        className="flex items-center m-5 gap-5 max-w-xs relative"
      >
        {/* Note: Κάνει submit επειδή είναι μόνο ένα text, εάν ήταν δύο++ δεν θα έκανε κάτι */}
        <input
          className="pl-1 w-full border-2 rounded-md hover:border-black z-10"
          type="text"
          placeholder='Search for a pokemon!'
          // Note: Έτσι τα κάνει lower case στο input(στο chrome) γιατί αλλάζουμε το value στο inputValue
          value={inputValue}
          
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
        />
        {/* Note: Έβγαλα το button γιατί ήταν useless γιατί κάνει το search submit με το enter*/}
        {/* <input
          type="submit"
          className="bg-slate-300 p-1 rounded-md hover:font-semibold focus:font-semibold w-16"
          // onClick={() => setPokemon(inputValue)}
          value={Search}
        /> */}
        <button type="submit" className='z-10 absolute right-[1.5px] top-[1px] bottom-[1.5px] rounded-md'>
          <SearchIcon className='fill-gray-400'/>
        </button>
      </form>
      <div className="pokeFont">
        {test.split("").map((letter, index) => {
          if (letters.includes(letter.toLowerCase())) {
            return (
              <span key={index} className="z-10 text-xl">
                {letter}
              </span>
            );
          } else {
            return (
              <span key={index} className="-z-10 text-xl">
                {letter}
              </span>
            );
          }
        })}
      </div>

      {/* Note: Εδώ ήθελε grid γιατί ήταν ΠΟΛΎ πιο εύκολο από'τι το flex */}
      <div className="grid justify-center grid-cols-repeat gap-x-8 gap-y-9  m-8">
        {pokemons.length > 0
          ? pokemons.map((pokemon, index) => {
              return <PokemonCard key={index} pokeInfo={pokemon} />;
            })
          : null}
      </div>
    </div>
    {ShowData()}
    </div>
  )
}

export default Main