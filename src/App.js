import { useState } from "react";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import { letters } from "./constants";
import Paths from "./routes/Paths";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const test = "Gotta catch them all!";
  

  // NOTE: Αυτό κάνει το ίδιο με το κάτω αλλά στο onclick καλό το setPokemon
  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPokemon(inputValue);
  //       console.log(data);
  //     });
  // }, [pokemon]);

  const listOfPokemons = () => {
    const names = pokemons.map((pokemon) => {
      return pokemon.name;
    });
    return names;
  };

  const getPokemon = async (e) => {
    //Note: Για να μην σε πηγαίνει σε άλλο url το form onSubmit!!SOS
    e.preventDefault();

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

  // test.split('').forEach(element => {
  //   if (fwnienta.includes(element.toLowerCase())){
  //     console.log(element);
  //   }else{
  //     console.log("no");
  //   }

  // });

  return (
    <Paths/>
    // <div className="bg-slate-100 min-h-screen h-max">
    //   {/* Note: Μπορώ είτε να κάνω onSubmit ή Onclick στο button */}
    //   {/* <form  className="flex items-center m-5 gap-5"> */}
    //   <Header/>
    //   <form
    //     onSubmit={(e) => getPokemon(e)}
    //     className="flex items-center m-5 gap-5"
    //   >
    //     <input
    //       className="border-2 pl-1"
    //       type="text"
    //       // Note: Έτσι τα κάνει lower case στο input(στο chrome) γιατί αλλάζουμε το value στο inputValue
    //       value={inputValue}
    //       onChange={(e) => setInputValue(e.target.value.toLowerCase())}
    //     />
    //     <input
    //       type="submit"
    //       className="bg-slate-300 p-1 rounded-md hover:font-semibold focus:font-semibold w-16"
    //       // onClick={() => setPokemon(inputValue)}
    //       value="Submit"
    //     />
    //   </form>
    //   <div className="pokeFont">
    //     {test.split("").map((letter, index) => {
    //       if (letters.includes(letter.toLowerCase())) {
    //         return (
    //           <span key={index} className="z-10 text-xl">
    //             {letter}
    //           </span>
    //         );
    //       } else {
    //         return (
    //           <span key={index} className="-z-10 text-xl">
    //             {letter}
    //           </span>
    //         );
    //       }
    //     })}
    //   </div>

    //   {/* Note: Εδώ ήθελε grid γιατί ήταν ΠΟΛΎ πιο εύκολο από'τι το flex */}
    //   <div className="grid justify-center grid-cols-repeat gap-x-8 gap-y-9  m-8 w-full">
    //     {pokemons.length > 0
    //       ? pokemons.map((pokemon, index) => {
    //           return <PokemonCard key={index} pokeInfo={pokemon} />;
    //         })
    //       : null}
    //   </div>
    // </div>
  );
}

export default App;
