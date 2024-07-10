import { useEffect, useState } from "react";
import axios from "axios";
import "./PockemonList.css";
import Pockemon from "../Pockemen/Pockemon";

function PockemonList() {
  const [pokemonListState, setpokemonListState] = useState({
    pockemonList: [],
    isLoading: true,
    pokedex_Url: "https://pokeapi.co/api/v2/pokemon/",
    next_Url: "",
    prev_Url: "",
  });

  async function downloadsPockemon() {
    setpokemonListState((prevState) => ({ ...prevState, isLoading: true }));

    const response = await axios.get(pokemonListState.pokedex_Url);
    const pockemonResults = response.data.results;

    const pockemonResultsPromise = pockemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pockemonData = await Promise.all(pockemonResultsPromise); // Fixed: Use Promise.all instead of axios.all

    const pokemonResult = pockemonData.map((pockeData) => {
      const pockemon = pockeData.data;
      return {
        id: pockemon.id,
        name: pockemon.name,
        image: pockemon.sprites.other.dream_world.front_default,
        type: pockemon.types,
      };
    });

    setpokemonListState((prevState) => ({
      ...prevState,
      pockemonList: pokemonResult,
      isLoading: false,
      next_Url: response.data.next,
      prev_Url: response.data.previous,
    })); // Moved next and prev url state updates here
  }

  useEffect(() => {
    downloadsPockemon();
  }, [pokemonListState.pokedex_Url]);

  return (
    <>
      <div className="pockemen-list-wrapper">
        <div className="pockemon-wrapper">
          {pokemonListState.isLoading
            ? "Loading......"
            : pokemonListState.pockemonList.map(
                (
                  p // Fixed: Accessing pockemonList within pokemonListState
                ) => (
                  <Pockemon
                    name={p.name}
                    image={p.image}
                    key={p.id}
                    id={p.id}
                  />
                )
              )}
        </div>
      </div>

      <div className="controls">
        <button
          disabled={!pokemonListState.prev_Url}
          onClick={() =>
            setpokemonListState((prevState) => ({
              ...prevState,
              pokedex_Url: pokemonListState.prev_Url,
            }))
          }
        >
          Prev.
        </button>
        <button
          disabled={!pokemonListState.next_Url}
          onClick={() =>
            setpokemonListState((prevState) => ({
              ...prevState,
              pokedex_Url: pokemonListState.next_Url,
            }))
          }
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PockemonList;
