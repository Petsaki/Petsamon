import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import { GetGenList } from "../state/action/genAction";
import { updatePokedex } from "../state/action/pokedexAction";
import { ReactComponent as Pikachu } from "../images/pikachu.svg";
import suprise_pikachu from "../images/suprise_pikachu_face.png";
import Paginate from "../components/Paginate";

const GenList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Pokedex = useSelector((state) => state.Pokedex.data);
  const [searchParams,setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('page') || '';
  const GenList = useSelector((state) => state.Gen);
  const locationNumber =
    Number(useLocation().pathname.split("/")[1].slice(-1)) + 1;
  const location = useLocation().pathname.split("/")[1];
  const firstRender = useRef(true);
  const skeleton = [];
  // const genData = sessionStorage.getItem("gen-list");
  // const dataToJSON = JSON.parse(genData);
  const fetchData = async () => {
    if (
      !(
        Pokedex.length > 0 &&
        Number(location.slice(-1)) + 1 === Number(Pokedex.id)
      )
    ) {
      
      console.log("SWSTA EKANA FETCH TO POKEDEX");
      console.log(`location number is: ${Number(location.slice(-1)) + 1}`);
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokedex/${Number(location.slice(-1)) + 1}`
      );
      const data = await res.json();
      // sessionStorage.setItem("gen-list", JSON.stringify(data));

      //BugFix: Πρέπει να κάνω αλλού το updatePokedex ή να κοιτάει εάν ο χρήστης είναι στο ίδιο url να μην το καλώ
      // BugFixed: Κάνω έλεγχο με if για εάν είναι ακόμη στο ίδιο gen!
      dispatch(updatePokedex(data));

    }

    // BugFix: Αυτό να το αποθηκεύω στο sessionStorage αλλά δεν ξέρω πόσο θα δουλεύει, γενικά κάνω μεγάλη σπατάλη γιατί συνέχεια καλεί στο API.
    // Το θέλω μόνο όταν πατάει κάποιο πόκεμον να δει και μετά όταν πάει πίσω ξανακάνει fetch.
    // BugFixed: Τελικά από μόνο του κάνει cashe τα δεδομένα
    if (searchTerm === ""){
      navigate("?page=1", { replace: true });
      dispatch(GetGenList(1))
    }
     dispatch(GetGenList(searchTerm));
    
  };
  
  const changePage = (event) => {
    const page = event
    setSearchParams({page});
    window.scrollTo(0, 0);
    dispatch(GetGenList(event))
  }

  const ShowData = () => {
    console.log("genList DATA: ");
    console.log(GenList.data);
    console.log("genList length: " + GenList.data.length);
    console.log("genList loading: " + GenList.loading);

    if (0 >= searchTerm || Math.ceil(Pokedex.pokemon_entries?.length / 20 ) < searchTerm){
      navigate("/notfound", { replace: true });
    }

    if (GenList.loading) {
      for (var i = 15; i !== 0; i--) {
        skeleton.push(
          <div
            key={i}
            className={`bg-white border-white flex flex-col items-center
        rounded-lg shadow-lg shadow-gray-400 p-3 z-10`}
          >
            <Pikachu className="h-[144px] animate-pulse" />
            <div className="skeleton w-24 h-4 mt-1" />
          </div>
        );
      }
      return(
        <div className="grid justify-center grid-cols-repeat md:grid-cols-cards4small lg:grid-cols-cards4 xl:grid-cols-cards5 gap-x-4 gap-y-5  m-3 sm:gap-x-8 sm:gap-y-9  sm:m-8 md:gap-x-5 md:gap-y-6  lg:gap-x-8 lg:gap-y-9  lg:m-8">
          {skeleton}
        </div>
      ) 
    }

    if (GenList.errorMsg !== "") {
      return <div className="flex-col justify-center items-center">
        <div className="" >
        <img className="w-80 min-w-[220px] mx-auto" alt="suprice pikachu"  src={suprise_pikachu} />
        </div>
        <h1 className="text-center text-lg font-semibold">{GenList.errorMsg}</h1>
      </div>
      
    }

    if (GenList.data.length > 0) {
      return (
        <div className="grid justify-center grid-cols-repeat md:grid-cols-cards4small lg:grid-cols-cards4 xl:grid-cols-cards5 gap-x-4 gap-y-5  m-3 sm:gap-x-8 sm:gap-y-9  sm:m-8 md:gap-x-5 md:gap-y-6  lg:gap-x-8 lg:gap-y-9  lg:m-8">
        {
          GenList.data.map((pokemon) => {
            return <PokemonCard key={pokemon.id} pokeInfo={pokemon} />;
          })
        }
      </div>
      )
      

    }


  };

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${location}`);
    //   const data = await res.json();
    //   sessionStorage.setItem("gen-list", JSON.stringify(data));
    // };
    // console.log(`dataToJSON:  ${dataToJSON.id}`);
    // console.log(`location: ${location}`)
    // if (dataToJSON.id !== location) {
    //     console.log("2-0 , OPA TI LEW 2-3")
    //     console.log("-------------------------------")
    //   //fetchData();
    // }

    if (!firstRender.current) {
      fetchData();
      console.log("Effect me location");
    }
    firstRender.current = false;
  }, [location]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${location}`);
    //   const data = await res.json();
    //   sessionStorage.setItem("gen-list", JSON.stringify(data));
    // };
    // console.log(`dataToJSON:  ${dataToJSON.id}`);
    // console.log(`location: ${location}`)
    // if (dataToJSON.id !== location) {
    //     console.log("2-0 , OPA TI LEW 2-3")
    //     console.log("-------------------------------")
    //   //fetchData();
    // }
    fetchData();

    console.log("Effect me []");
  }, []);

  return (
    <div className="pb-10 pt-6  mx-auto">
        {ShowData()}
     {Pokedex.pokemon_entries?.length > 0 && (
       <Paginate
       pageCount={Math.ceil(Pokedex.pokemon_entries.length / 20)}
       fetchFun={changePage}
       currentPage={searchTerm}
       marginPages={1}
       sidePagesFromCurrent={1}
       />
     )}     
     
    </div>
  );
};

export default GenList;
