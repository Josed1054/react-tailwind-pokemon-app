import React, { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useFetch from "../../custom-hooks/fetch";
import { DisplayPokemonMin } from "../../components/display-pokemons";

export function Pokemons() {
  const [animation] = useAutoAnimate();

  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [records, setRecords] = useState(20);

  const {
    data: pokemons,
    loading,
    error,
  } = useFetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);

  useEffect(() => {
    if (!loading) {
      setRecords((page - 1) * 20 + pokemons.results.length);
    }
  }, [pokemons]);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function changePage(event: SyntheticEvent) {
    const { name } = event.target as HTMLButtonElement;

    if (name === "next") {
      setPage((prevPage) => prevPage + 1);
      setOffset((prevData) => prevData + pokemons.results.length);
    } else if (name === "prev") {
      setPage((prevPage) => prevPage - 1);
      setOffset((prevData) => prevData - pokemons.results.length);
    }
  }

  function displayPokemons() {
    return pokemons.results.map((pokemon: any, index: number) => {
      return <DisplayPokemonMin key={index} pokemonURL={pokemon.url} />;
    });
  }

  return (
    <div
      ref={animation as React.RefObject<HTMLDivElement>}
      className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
    >
      <div className="flex-[100%] flex flex-wrap justify-around">
        <button
          type="button"
          className={`border-solid border-2 border-red-200 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
            pokemons.previous === "" ||
            pokemons.previous === null ||
            pokemons.previous === undefined
              ? "invisible"
              : ""
          }`}
          name="prev"
          onClick={changePage}
        >
          Back
        </button>
        <p className="self-center w-1/2 text-center text-x md:text-xl">{`Pokemons ${
          records - pokemons.results.length + 1
        } - ${records}`}</p>
        <button
          type="button"
          className={`border-solid border-2 border-red-200 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
            pokemons.next === "" ||
            pokemons.next === null ||
            pokemons.next === undefined
              ? "invisible"
              : ""
          }`}
          name="next"
          onClick={changePage}
        >
          Next
        </button>
      </div>

      {displayPokemons()}
    </div>
  );
}
