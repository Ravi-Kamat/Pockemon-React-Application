import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonDetail.css";

function PokemonDetails() {
  const { id } = useParams();
  //   console.log(id);

  const [pokemon, setPokemon] = useState({});
  async function downloadPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      console.log(response.data);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.log("Error fetching Pokemon data:", error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <div>
        <img className="pokemon-details-img" src={pokemon.image} />
      </div>
      <div className="pokemon-details-name">
        <span>{pokemon.name}</span>
      </div>
      <div className="pokemon-details-name">Height: {pokemon.height}</div>
      <div className="pokemon-details-name"> weight: {pokemon.weight}</div>
      <div className="pokemon-details-type">
        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>
    </div>
  );
}

export default PokemonDetails;
