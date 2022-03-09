import React, { useState } from "react";
import logo from "../images/epilektos_logo_white.png";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../images/search_black_24dp.svg";
import { updatePokemon } from "../state/reducers/pokemonSearchAction";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [inputValue, setInputValue] = useState("");

  const SearchPokemon = useSelector((state) => state.PokemonSearch.data);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation().pathname;

  const getPokemon = (e) => {
    //Note: Για να μην σε πηγαίνει σε άλλο url το form onSubmit!!SOS
    e.preventDefault();
    dispatch(updatePokemon(inputValue));
    if (location != "/") {
      navigate("/", { replace: true });
    }
  };

  return (
    <header className=" bg-sky-300 overflow-y-hidden shadow-lg shadow-slate-400/60 sticky z-50 top-0">
      <div className="py-1 flex items-center justify-between max-w-7xl mx-5 lg:mx-10 xl:mx-auto">
        {/* Note: Για να κάνω black την εικόνα κάνω filter brightness-0 */}
        {/* Note: Για να είναι στο κέντρο το search bar έχω βάλει αυτό και το navbar w-full */}
        <div className="w-full">
          <Link to={"/"}>
            <img className="w-12 md:w-16" src={logo} />
          </Link>
        </div>
        {/* Note: Μπορώ είτε να κάνω onSubmit ή Onclick στο button */}
        {/* <form  className="flex items-center m-5 gap-5"> */}
        <form
          onSubmit={(e) => getPokemon(e)}
          className="flex items-center m-5 gap-5 w-full max-w-xs min-w-[200px] relative"
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
