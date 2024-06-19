import { useEffect, useState } from "react";
import axios from "axios";
import "./PockemonList.css";
import Pockemon from "../Pockemen/Pockemon";

function PockemonList() {
  const [pockemonList, setPockemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pokedex_Url, setPockedex_Url] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const [next_Url, setNext_Url] = useState("");
  const [prev_Url, setPrev_Url] = useState("");

  async function downloadsPockemon() {
    setIsLoading(true);
    const response = await axios.get(pokedex_Url);
    const pockemonResults = response.data.results;

    setNext_Url(response.data.next); // for next page
    setPrev_Url(response.data.previous); // for previous page

    const pockemonResultsPromise = pockemonResults.map((pockemon) =>
      axios.get(pockemon.url)
    );
    const pockemonData = await axios.all(pockemonResultsPromise);
    console.log(pockemonData);

    const Res = pockemonData.map((pockeData) => {
      const pockemon = pockeData.data;
      return {
        id: pockemon.id,
        name: pockemon.name,
        image: pockemon.sprites.other.dream_world.front_default,
        type: pockemon.types,
      };
    });
    console.log(Res);
    setPockemonList(Res);

    setIsLoading(false);
  }
  useEffect(() => {
    downloadsPockemon();
  }, [pokedex_Url]);

  return (
    <>
      <div className="pockemen-list-wrapper">
        <div className="pockemon-wrapper">
          {isLoading
            ? "Loading......"
            : pockemonList.map((p) => (
                <Pockemon name={p.name} image={p.image} key={p.id} id={p.id} />
              ))}
        </div>
      </div>

      <div className="controls">
        <button
          disabled={prev_Url == null}
          onClick={() => setPockedex_Url(prev_Url)}
        >
          Prev.
        </button>
        <button
          disabled={next_Url == null}
          onClick={() => setPockedex_Url(next_Url)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PockemonList;
