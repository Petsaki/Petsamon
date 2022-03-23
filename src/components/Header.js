import React, { useEffect, useState } from "react";
import logo from "../images/epilektos_logo_white.png";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../images/search_black_24dp.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetGenList } from "../state/action/genAction";
import { pushPokemon } from "../state/action/pokemonsAction";
import { ReactComponent as SearchIconBlack } from "../images/search_black_24dp.svg";
import { updatePokedex } from "../state/action/pokedexAction";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const PokemonsList = useSelector((state) => state.Pokemons.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const getPokemon = (e) => {
    //Note: Για να μην σε πηγαίνει σε άλλο url το form onSubmit!!SOS
    e.preventDefault();

    const fetchData = async () => {
      if (!(inputValue === "") && !listOfPokemons().includes(inputValue)) {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${inputValue}`
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
    };

    fetchData();
    // dispatch(updatePokemon(inputValue));
    if (location !== "/") {
      navigate("/", { replace: true });
    }

  };

  const checkgenUrl =  (e) =>{

    const fetchData = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokedex/${(Number(e.target.id.slice(-1))+1)}`
      );
      const data = await res.json();
      // sessionStorage.setItem("gen-list", JSON.stringify(data));
      dispatch(updatePokedex(data));
      
    }
    
    if (location.split("/")[1] !== e.target.id){
      console.log("RESET THE PAGE")
      console.log(Number(e.target.id.slice(-1))+1)
      fetchData();
      
    }
  }

  const listOfPokemons = () => {
    const names = PokemonsList.map((pokemon) => {
      return pokemon.name;
    });
    return names;
  };


  // useEffect( () => {
  //   const fetchData = async () => {
  //     if (!(inputValue === "") && !listOfPokemons().includes(inputValue)) {
  //       const res = await fetch(
  //         `https://pokeapi.co/api/v2/pokemon/${inputValue}`
  //       );
  //       const data = await res.json();

  //       dispatch(pushPokemon(data));

  //       console.log("pokemon on UseEffect: " + PokemonsList.length);
  //       // setPokemons((prevPokemon) => {
  //       //   // Note: Για να βάζω τα καινούργια αντικείμενα στην αρχή, αλλιώς [...prevPokemon, data]
  //       //   // BugFix: Για κάποιο λόγο επειδή βάζω το data στην αρχή, όταν κάνει load δείχνει την εικόνα του προηγούμενου pokemon και μετά του σωστού
  //       //   return [data, ...prevPokemon];

  //       // });
  //       console.log(data);
  //     }
  //   };

  //   fetchData();

  //   // Feature: Εάν υπάρχει μέσα στον πίνακα τότε να το βάζω στην πρώτη θέση
  //   // else if (!(inputValue == "") && listOfPokemons().includes(inputValue)) {

  //   //   if (listOfPokemons().indexOf(inputValue) > 0) {

  //   //     let removeItemIndex = listOfPokemons().indexOf(inputValue,1);
  //   //     console.log(removeItemIndex);
  //   //     setPokemons((prevPokemon) => {

  //   //       let removedItem = prevPokemon[removeItemIndex]
  //   //       // setTimeout(prevPokemon.splice(removeItemIndex, 1),2000)
  //   //       // console.log(prevPokemon.splice(removeItemIndex, 1))
  //   //       // prevPokemon.splice(removeItemIndex, 1)
  //   //       console.log(prevPokemon)
  //   //       return [removedItem, ...prevPokemon];
  //   //     });
  //   //   }
  //   // }
  // }, [inputValue]);

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
    <header className=" bg-sky-300 overflow-y-hidden shadow-lg shadow-slate-400/60 sticky z-50 top-0">
      <div className="py-1 grid grid-rows-[50px,50px] grid-cols-4 sm:gap-x-4 sm:flex items-center justify-between max-w-7xl mx-5 lg:mx-10 xl:mx-auto">

        {/* ----------------------- Icon --------------------------------------------------- */}

        {/* Note: Για να κάνω black την εικόνα κάνω filter brightness-0 */}
        {/* Note: Για να είναι στο κέντρο το search bar έχω βάλει αυτό και το navbar w-full */}
        <div className="w-full row-start-1 col-start-1 row-end-2 col-end-2">
          {/* Note: Είχε θέμα με το Link και έπιανα το w-full και έβαλα το κάτω div για να το περιορίσω στο width του img */}
          <div className="w-fit">
            <Link to={"/"}>
              <img alt="logo" className="w-12 md:w-16" src={logo} />
            </Link>
          </div>
        </div>


        {/* ----------------------- Search Bar --------------------------------------------------- */}

        {/* Note: Μπορώ είτε να κάνω onSubmit ή Onclick στο button */}
        {/* <form  className="flex items-center m-5 gap-5"> */}
        <form
          onSubmit={(e) => getPokemon(e)}
          className="flex items-center justify-center w-full mx-auto sm:w-full max-w-xs min-w-[200px] relative row-start-2 col-start-1 row-end-3 col-end-5 "
        >
          {/* Note: Κάνει submit επειδή είναι μόνο ένα text, εάν ήταν δύο++ δεν θα έκανε κάτι */}
          <input
            className="pl-1 w-full border-2 rounded-md hover:border-black z-10"
            type="text"
            placeholder="Search for a pokemon!"
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
          <button
            type="submit"
            className="z-10 absolute right-[1.5px] top-[1px] bottom-[1.5px] rounded-md"
          >
            <SearchIcon className="fill-gray-400" />
          </button>
        </form>


        {/* ----------------------- NavBar --------------------------------------------------- */}
        <nav className="w-full text-white font-bold whitespace-nowrap row-start-1 col-start-2 row-end-2 col-end-5">
          <ul className="flex justify-evenly sm:justify-end flex-col-reverse gap-y-1 md:flex-row md:gap-x-7">
            <div className="flex justify-end gap-x-3 lg:gap-x-3">
              <li>
                <Link className="" id="gen1" to={"/gen1?page=1"} >
                  Gen 1
                </Link>
              </li>
              <li>
                <Link className="" id="gen2" to={"/gen2?page=1"} >
                  Gen 2
                </Link>
              </li>
              <li>
                <Link className="" id="gen3" to={"/gen3?page=1"} >
                {/* <Link className="" id="gen3" to={"/gen3"} onClick={(e)=> checkgenUrl(e)}> */}
                  Gen 3
                </Link>
              </li>
            </div>

            <div className="flex justify-end gap-x-3 lg:gap-x-3">
              <li>
                <a className="text-lime-500" href="">
                  Favourite
                </a>
              </li>
              <li>
                <a className="text-rose-600" href="">
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
