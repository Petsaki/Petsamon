import React, { useState } from "react";
import logo from "../images/epilektos_logo_white.png";
import { useDispatch, useSelector } from "react-redux";
import {ReactComponent as SearchIcon} from '../images/search_black_24dp.svg';
import { updatePokemon } from "../state/reducers/pokemonSearchAction";

const Header = () => {
  const [pokemons, setPokemons] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const SearchPokemon = useSelector((state) => state.PokemonSearch.data)

  const dispatch = useDispatch();

  const listOfPokemons = () => {
    const names = pokemons.map((pokemon) => {
      return pokemon.name;
    });
    return names;
  };

  const getPokemon = async (e) => {
    //Note: Για να μην σε πηγαίνει σε άλλο url το form onSubmit!!SOS
    e.preventDefault();

    dispatch(updatePokemon(inputValue))

    if (!(inputValue == "") && !listOfPokemons().includes(inputValue)) {
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

  return (
    <header className=" bg-sky-300 overflow-y-hidden shadow-md sticky z-50 top-0">
      <div className="py-3 flex items-center justify-between max-w-7xl mx-5 lg:mx-10 xl:mx-auto">
        {/* Note: Για να κάνω black την εικόνα κάνω filter brightness-0 */}
        {/* Note: Για να είναι στο κέντρο το search bar έχω βάλει αυτό και το navbar w-full */}
        <div className="w-full">
          <img className="w-12 md:w-16" src={logo} />
        </div>

        <form
        onSubmit={(e) => getPokemon(e)}
        className="flex items-center m-5 gap-5 w-full max-w-xs min-w-[200px] relative"
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
        <nav className="w-full text-white font-bold whitespace-nowrap">
          <ul className="flex justify-end flex-col-reverse gap-y-1 md:flex-row md:gap-x-7">
            <div className="flex justify-end gap-x-3 lg:gap-x-3">
              <li>
                <a className="" href="#">
                  Gen 1
                </a>
              </li>
              <li>
                <a className="" href="#">
                  Gen 2
                </a>
              </li>
              <li>
                <a className="" href="#">
                  Gen 3
                </a>
              </li>
            </div>

            <div className="flex justify-end gap-x-3 lg:gap-x-3">
              <li>
                <a className="text-lime-500" href="#">
                  Favourite
                </a>
              </li>
              <li>
                <a className="text-rose-600" href="#">
                  Sing Out
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
