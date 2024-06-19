import Search from "../Search/Search";
import "../Pokedex/Pokedex.css";
import PockemonList from "../PokemonList/PokemonList";

function Pokedex() {
  return (
    <div className="pokedex-wrapper">
      <Search />
      <PockemonList />
    </div>
  );
}

export default Pokedex;
