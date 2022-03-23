import axios from "axios";

export const GetGenList = (page) => async (dispatch, getState) => {

  dispatch({
    type: "POKEMON_LIST_LOADING",
  });

  const perPage = 20;
  // let perPage = 20;
  // const maxPerGen = [151,251,386];
  // const maxPerGen = [151, 251, 202];
  const dataIndex = page * perPage;
  // const genData = sessionStorage.getItem("gen-list");
  // const dataToJSON = JSON.parse(genData);
  // const genSum = dataToJSON.pokemon_entries.length
  // BugFix: Να δω άμα μπορώ το pageData να το κάνω Object (γιατί τρώει πιο πολύ μνήμη έτσι :) )
  const pageData=[];
  const pokedex = getState().Pokedex.data;
  console.log(pokedex);


    // if (gen === "gen1" && page * perPage > maxPerGen[0]) {
    //   perPage = perPage - (page * perPage - maxPerGen[0]);
    // } else if (gen === "gen2" && page * perPage > maxPerGen[1]) {
    //   perPage = perPage - (page * perPage - maxPerGen[1]);
    // } else if (gen === "gen3" && page * perPage > maxPerGen[2]) {
    //   perPage = perPage - (page * perPage - maxPerGen[2]);
    // }

    // const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`)

    // BugFix: Μήπως έχει άλλη function για αυτό που κάνω(slice)
    // BugFixed: Για κάποιο λόγο ΔΕΝ δίνει τα πόκεμον με την σωστή σειρά?!?!?! SOS-SOS-SOS
    // Note: Με το promise.all γυρνάει στο τέλος όταν τελειώσει το fetch, μέσα στο Map κάνω return τα data
    // και μετά το promise μου τα γυρνάει όλα ΜΕ ΤΗΝ ΣΕΊΡΑ ΠΟΥ ΠΡΈΠΕΙ.
    // BugFix: ενώ πετάει error στο promise , το map μετά συνεχίζει να κάνει fetching 
    await Promise.all(pokedex.pokemon_entries.slice((dataIndex  - perPage), dataIndex).map( async (pokemon) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.name}`);
        return res.data;
    })).then(res =>{
      dispatch({
        type: "POKEMON_LIST_SUCCESS",
        payload: res,
      });
    }).catch( err => {
      dispatch({
        type: "POKEMON_LIST_FAIL",
      })
    }

    )
    

    // console.log(pageData);
    // dataToJSON.pokemon_entries.slice((dataIndex  - perPage), dataIndex).map((pokemon) => {
    //   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.name}`)
    //     .then((res) => res.json())
    //     .then((pokemon) => console.log(pokemon));
    // });
    // console.log(pageData);

    // dataToJSON.pokemon_entries.slice(1, 2).map((pokemon) => {
    //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.name}`);
    //   const data = await res.json();
    //   return console.log(pokemon);
    // });
    // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // const data = await res.json();


};