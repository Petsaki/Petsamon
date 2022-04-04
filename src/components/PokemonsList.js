import React from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";

const PokemonsList = () => {
 
  const PokemonsList = useSelector((state) => state.Pokemons.data);

  // useEffect(() => {
  //   const data = localStorage.getItem("pokemons-list");
  //   if (data) {
  //       console.log("LOCAL STORAGE: " + JSON.parse(data));
  //       // dispatch(pushPokemon(data[pokemon]));
  //   }
  // }, []);
 
  return (
    <div className="pb-10 pt-6 max-w-[1920px] mx-auto">
      {/* Note: Εδώ ήθελε grid γιατί ήταν ΠΟΛΎ πιο εύκολο από'τι το flex */}
      {/* BugFix: Να φτιάξω τις στήλες έτσι ώστε να μην έχει η τελευταία σειρά λιγότερα, είναι θέμα με το responsive για το πως θα τα δείχνω */}
      {/* BugFixed: Έγινε αλλά έβαλα αρκετό css λόγου ότι μόνο στο md: γινόντουσαν 3 και τα έκανα 4. Εάν τα είχα κάνει 2 θα ήταν πολύ εύκολο */}
      <div className="grid justify-center grid-cols-repeat gap-x-4 gap-y-5  m-3 sm:gap-x-8 sm:gap-y-9  sm:m-8">
        {PokemonsList.length > 0
          ? PokemonsList.map((pokemon) => {
              return <PokemonCard key={pokemon.id} pokeInfo={pokemon} />;
            })
          : null}
      </div>
    </div>
  );
};

export default PokemonsList;
