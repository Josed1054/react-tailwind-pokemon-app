import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { DisplayPokemonMin } from "../../components/display-pokemons";
import useFetch from "../../custom-hooks/fetch";

export function Home() {
  const [animation] = useAutoAnimate();
  const [randomNumber, setRandomNumber] = useState(
    Math.round(Math.random() * 1050)
  );
  const [filter, setFilter] = useState<any>([{}]);
  const [openFilter, setOpenFilter] = useState(false);
  const [resetALL, setResetALL] = useState(false);

  const {
    data: pokemons,
    loading,
    error,
  } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${randomNumber}&limit=100`
  );

  const { data: fetchTypes, loading: loadingTypes } = useFetch(
    "https://pokeapi.co/api/v2/type/"
  );

  useEffect(() => {
    setFilter([{}]);
    if (!loadingTypes) {
      fetchTypes.results.forEach((result: any) =>
        setFilter((prevFilter: any) => {
          return {
            ...prevFilter,
            [result.name]: false,
          };
        })
      );
    }
  }, [fetchTypes, resetALL]);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function openFilters() {
    setOpenFilter((prevValue) => !prevValue);
  }

  function setFilterValue(event: SyntheticEvent) {
    const { id } = event.target as HTMLInputElement;

    setFilter((prevFilter: any) => {
      return {
        ...prevFilter,
        [id]: !prevFilter[id],
      };
    });
  }

  function clearALL() {
    setResetALL((prevValue) => !prevValue);
  }

  function displayFilters() {
    return fetchTypes.results.map((result: any, index: number) => (
      <label htmlFor={result.name} key={index} className="cursor-pointer">
        {result.name}{" "}
        <input
          id={result.name}
          type="checkbox"
          checked={filter[result.name]}
          onChange={setFilterValue}
        />
      </label>
    ));
  }

  function displayPokemons() {
    return pokemons.results.map((pokemon: any, index: number) => {
      return (
        <DisplayPokemonMin
          key={index}
          pokemonURL={pokemon.url}
          filter={filter}
          filters={fetchTypes.results}
        />
      );
    });
  }

  return (
    <>
      <div
        ref={animation as React.RefObject<HTMLDivElement>}
        className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
      >
        <div className="flex flex-col w-[90vw] mx-auto">
          <div
            className="flex flex-row cursor-pointer border-solid border-2 border-red-200 rounded-lg w-[20vw] max-w-[76px] md:w-[7vw] max-h-[4vh] items-center self-end mb-4"
            onClick={openFilters}
          >
            <h2 className="m-2">Filter</h2>
            {openFilter ? (
              <MdExpandLess className="scale-150" />
            ) : (
              <MdExpandMore className="scale-150" />
            )}
          </div>
          {openFilter && (
            <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg">
              {displayFilters()}

              <button
                type="button"
                className="border-solid border-2 border-red-200 rounded-lg w-[25vw] max-w-[160px] md:w-[7vw] max-h-[4vh]"
                onClick={clearALL}
              >
                Clear ALL
              </button>
            </div>
          )}
        </div>
        {displayPokemons()}
      </div>
    </>
  );
}
