import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useFetch from "../../custom-hooks/fetch";
import { DisplayPokemonMin } from "../../components/display-pokemons";

export function Home() {
  const [animation] = useAutoAnimate();
  const [randomNumber, setRandomNumber] = useState(
    Math.round(Math.random() * 1050)
  );

  const {
    data: pokemons,
    loading,
    error,
  } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${randomNumber}&limit=100`
  );

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function displayPokemons() {
    return pokemons.results.map((pokemon: any, index: number) => {
      return <DisplayPokemonMin key={index} pokemonURL={pokemon.url} />;
    });
  }

  return (
    <>
      <div
        ref={animation as React.RefObject<HTMLDivElement>}
        className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
      >
        {displayPokemons()}
      </div>
    </>
  );
}
