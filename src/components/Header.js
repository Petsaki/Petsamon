import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../images/epilektos_logo_white.png";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../images/search_black_24dp.svg";
import { ReactComponent as LightIcon } from "../images/light_mode_black_24dp.svg";
import { ReactComponent as DarkIcon } from "../images/dark_mode_black_24dp.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetGenList } from "../state/action/genAction";
import { pushPokemon } from "../state/action/pokemonsAction";
import { updatePokedex } from "../state/action/pokedexAction";
import axios from "axios";
import Toast from "./Toast";
import { ThemeContext } from "./ThemeProvider";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const PokemonsList = useSelector((state) => state.Pokemons.data);
  const [errorMes,setErrorMes]= useState(false);
  const {theme,setTheme} = useContext(ThemeContext);
  const errorToastTime = () => {
    setTimeout(() => setErrorMes(false),4000);
  }
  const errorToastTime2 = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const getPokemon = (e) => {
    //Note: Για να μην σε πηγαίνει σε άλλο url το form onSubmit!!SOS
    e.preventDefault(); 
    errorToastTime2.current = clearTimeout(errorToastTime2.current);
    setErrorMes(false);
    const fetchData = async () => {
      if (!(inputValue === "") && !listOfPokemons().includes(inputValue)) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
        .then (res => { return res.data})
        .then (data => { dispatch(pushPokemon(data))})
        .catch(error => {
          console.log("ERROR");
          setErrorMes(true)
          // errorToastTime();
          errorToastTime2.current = setTimeout(() => setErrorMes(false),4000);
        })
        

        console.log("pokemon on UseEffect: " + PokemonsList.length);
        // setPokemons((prevPokemon) => {
        //   // Note: Για να βάζω τα καινούργια αντικείμενα στην αρχή, αλλιώς [...prevPokemon, data]
        //   // BugFix: Για κάποιο λόγο επειδή βάζω το data στην αρχή, όταν κάνει load δείχνει την εικόνα του προηγούμενου pokemon και μετά του σωστού
        //   return [data, ...prevPokemon];
        // BugFixed: Αυτό γινόταν λόγου ότι είχα κακό key και έβαλα άλλο :) (είχα το index) 

        // });
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
           // BugFixed: Αυτό γινόταν λόγου ότι είχα κακό key και έβαλα άλλο :) (είχα το index) 
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
    <header className=" bg-sky-400 dark:bg-neutral-900 dark:shadow-none overflow-y-hidden shadow-lg shadow-slate-400/60 sticky z-50 top-0">
      <div className="py-1 grid grid-rows-[50px,50px] grid-cols-4 sm:gap-x-4 sm:flex items-center justify-between max-w-7xl mx-5 mt-3 sm:mt-0 lg:mx-10 xl:mx-auto">

        {/* ----------------------- Icon --------------------------------------------------- */}

        {/* Note: Για να κάνω black την εικόνα κάνω filter brightness-0 */}
        {/* Note: Για να είναι στο κέντρο το search bar έχω βάλει αυτό και το navbar w-full */}
        <div className="sm:flex-1  row-start-1 col-start-1 row-end-2 col-end-2">
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
          className=" items-center justify-center sm:flex sm:flex-1 mx-auto max-w-xs min-w-[230px] relative row-start-2 col-start-1 row-end-3 col-end-5 "
        >
          {/* Note: Κάνει submit επειδή είναι μόνο ένα text, εάν ήταν δύο++ δεν θα έκανε κάτι */}
          <input
            className="pl-1 w-full border-2 rounded-md hover:border-black z-10 dark:bg-[#26282c] dark:border-[#546076] dark:text-white"
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
        <div className="flex justify-end gap-x-4 row-start-1 col-start-2 row-end-2 col-end-5 sm:flex-1">
        <nav className=" text-white font-bold py-2 whitespace-nowrap ">
          <ul className="flex justify-end flex-wrap flex-col-reverse xl:flex-row gap-y-2 md:gap-x-7">
            <div className="flex justify-end gap-x-2">
              <li>
                <Link className={`p-1 rounded-md ${location.split("/")[1] === "gen1" ? "bg-sky-600/80 dark:bg-[#393c41]  " : "hover:bg-sky-500/80 hover:dark:bg-[#26282c] focus:dark:dark:bg-[#26282c] focus:bg-sky-500/80"} transition ease-out duration-200 `} id="gen1" to={"/gen1?page=1"}
                onClick={()=> window.scrollTo(0, 0)} >
                  Gen 1
                </Link>
              </li>
              <li>
                <Link className={`p-1 rounded-md ${location.split("/")[1] === "gen2" ? "bg-sky-600/80 dark:bg-[#393c41] " : "hover:bg-sky-500/80 hover:dark:bg-[#26282c] focus:dark:dark:bg-[#26282c] focus:bg-sky-500/80"} transition ease-out duration-200`} id="gen2" to={"/gen2?page=1"}
                onClick={()=> window.scrollTo(0, 0)} >
                  Gen 2
                </Link>
              </li>
              <li>
                <Link className={`p-1 rounded-md ${location.split("/")[1] === "gen3" ? "bg-sky-600/80 dark:bg-[#393c41] " : "hover:bg-sky-500/80 hover:dark:bg-[#26282c] focus:dark:dark:bg-[#26282c] focus:bg-sky-500/80"} transition ease-out duration-200`} id="gen3" to={"/gen3?page=1"} 
                onClick={()=> window.scrollTo(0, 0)}>
                {/* <Link className="" id="gen3" to={"/gen3"} onClick={(e)=> checkgenUrl(e)}> */}
                  Gen 3
                </Link>
              </li>
            </div>

            <div className="flex justify-end gap-x-2">
              <li>
                <a className="text-lime-500 p-1 hover:text-white hover:bg-lime-500 focus:text-white focus:bg-lime-500 rounded-md transition ease-out duration-200" href="">
                  Favourite
                </a>
              </li>
              <li>
                <a className="text-rose-600 p-1 hover:bg-rose-600 hover:text-white focus:bg-rose-600 focus:text-white  rounded-md transition ease-out duration-200" href="">
                  Sing Out
                </a>
              </li>
            </div>
          </ul>

        </nav>
        <label className="bg-white text-black font-bold rounded-full aspect-square   cursor-pointer flex justify-center items-center self-center focus:border-2 focus:border-orange-600">
          <input className="opacity-0 w-0 h-0" type="checkbox" onClick={()=> setTheme(theme === "dark" ? "light" : "dark")}/>
          <div className="active:translate-y-[1px] w-full h-full px-1 rounded-full flex items-center">
          <span className="slider round active:translate-y-[1px]  leading-none rounded-full select-none self">{theme === "dark" ? <LightIcon className="fill-gray-500" /> :<DarkIcon/>}</span>
          </div>
          
          
        </label>
        </div>
      </div>
      {errorMes && (
        <Toast/>
      )}
      
    </header>
  );
};

export default Header;
