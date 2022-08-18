import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { DisplayPokemonMin } from "../../components/display-pokemons";
import useFetch from "../../custom-hooks/fetch";

export function Search() {
  const [animation] = useAutoAnimate();
  let location = useLocation();
  const [pokemon, setPokemon] = useState(window.location.href.split("/").pop());
  const [partOfSearch, setPartOfSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [filter, setFilter] = useState<any>([{}]);
  const [openFilter, setOpenFilter] = useState(false);
  const [resetALL, setResetALL] = useState(false);

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

  const {
    data: pokemons,
    loading,
    error,
  } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=2000");

  const filteredPokemon = useMemo(() => {
    if (!loading) {
      const regexp = new RegExp(pokemon!, "gi");

      return pokemons.results.filter((Pokemon: any) =>
        Pokemon.name.match(regexp)
      );
    }
  }, [pokemon, pokemons, loading]);

  useEffect(() => {
    if (!loading) {
      setPages(Math.ceil(filteredPokemon.length / 20));
      setPartOfSearch(filteredPokemon.slice(0, 20));
    }
  }, [filteredPokemon]);

  useEffect(() => {
    if (!loading) {
      let start = (page - 1) * 20;
      let end =
        filteredPokemon.length - (page - 1) * 20 >= 20
          ? (page - 1) * 20 + 20
          : filteredPokemon.length;
      setPartOfSearch(filteredPokemon.slice(start, end));
    }
  }, [page]);

  useEffect(() => {
    setPokemon(window.location.href.split("/").pop());
    setPage(1);
  }, [location]);

  // handle change pagination
  function changePage(event: SyntheticEvent) {
    const { name } = event.target as HTMLButtonElement;

    if (name === "next" && page < pages) {
      setPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function displayPokemons() {
    return partOfSearch.map((Pokemon: any, index: number) => (
      <DisplayPokemonMin
        key={index}
        pokemonURL={Pokemon.url}
        filter={filter}
        filters={fetchTypes.results}
      />
    ));
  }

  return (
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
            // eslint-disable-next-line react/jsx-no-undef
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
      <div className="flex-[100%] flex flex-wrap justify-around">
        <button
          type="button"
          className={`border-solid border-2 border-red-200 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
            page > 1 ? "" : "invisible"
          }`}
          name="prev"
          onClick={changePage}
        >
          Back
        </button>
        <p className="self-center w-1/2 text-center text-x md:text-xl">{`Pages ${page} - ${pages}`}</p>
        <button
          type="button"
          className={`border-solid border-2 border-red-200 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
            page < pages ? "" : "invisible"
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
