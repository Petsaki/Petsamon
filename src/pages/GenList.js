import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import { GetGenList } from "../state/action/genAction";
import { updatePokedex } from "../state/action/pokedexAction";
import { ReactComponent as Pikachu } from "../images/pikachu.svg";
import ReactPaginate from "react-paginate";
import suprise_pikachu from "../images/suprise_pikachu_face.png";

const GenList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Pokedex = useSelector((state) => state.Pokedex.data);
  const [searchParams,setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('page') || '';
  const [atPage,setAtPage] = useState(0);
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
      setAtPage(0);
    }

    // BugFix: Αυτό να το αποθηκεύω στο sessionStorage αλλά δεν ξέρω πόσο θα δουλεύει, γενικά κάνω μεγάλη σπατάλη γιατί συνέχεια καλεί στο API.
    if (searchTerm === ""){
      navigate("?page=1", { replace: true });
      dispatch(GetGenList(1))
    }
     dispatch(GetGenList(searchTerm));
    
  };
  
  const testingFun = (event) => {
    console.log(event.selected + 1)
    const page = event.selected + 1
    setSearchParams({page});
    setAtPage(event.selected)
    dispatch(GetGenList(event.selected + 1))
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
      return skeleton;
    }

    if (GenList.errorMsg !== "") {
      return <div>
        <img alt="suprice pikachu"  src={suprise_pikachu} />
        <h1 className="text-center text-lg font-semibold">{GenList.errorMsg}</h1>
      </div>
      
    }

    if (GenList.data.length > 0) {
      return GenList.data.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokeInfo={pokemon} />;
      });
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
    <div className="pb-10 pt-6 max-w-[1920px] mx-auto">
      <div className="grid justify-center grid-cols-repeat gap-x-4 gap-y-5  m-3 sm:gap-x-8 sm:gap-y-9  sm:m-8">
        {ShowData()}
      </div>
      
      {Pokedex.pokemon_entries?.length > 0 && (
        <ReactPaginate className={` flex-row items-center bg-sky-400 font-bold text-white text-lg rounded-md shadow-md shadow-sky-600/75 px-4 w-fit mx-auto mt-10 justify-center  ${GenList.loading ? "hidden" : "flex" }`}
        pageCount={Math.ceil(Pokedex.pokemon_entries.length / 20)}
        // Note: Πόσες pages να δείχνει δίπλα από το page που είναι
        pageRangeDisplayed={2}
        // Note: Πόσες pages να δείχνει στα άκρα
        marginPagesDisplayed={1}
        onPageChange={testingFun}
        previousLabel="&#129128;" 
        nextLabel="&#129130;"

        activeClassName=" font-extrabold scale-110 bg-sky-600/80 rounded-sm"
        pageLinkClassName= "pagenate-style"
        breakLinkClassName="pagenate-style"

        previousLinkClassName={`pagenate-style hidden sm:block sm:mr-6`}
        nextLinkClassName={`pagenate-style  hidden sm:block sm:ml-6`}
        
        nextClassName=""
        previousClassName=""
        forcePage={searchTerm - 1}            
      />
      )}
          
     
    </div>
  );
};

export default GenList;
