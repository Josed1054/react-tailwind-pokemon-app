import React from "react";
import useFetch from "../../custom-hooks/fetch";
import { DisplayAbilities } from "../display-abilities";

export function DisplayPokemon(props: { pokemonID: any }) {
  const {
    data: pokemon,
    loading,
    error,
  } = useFetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemonID}`);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function displayAbilities() {
    return pokemon.abilities.map((abilities: any, index: number) => {
      return <DisplayAbilities key={index} url={abilities.ability.url} />;
    });
  }

  function displayForms() {
    return pokemon.forms.map((form: any, index: number) => {
      return <p key={index}>Form: {form.name}</p>;
    });
  }

  function displayStats() {
    return pokemon.stats.map((stats: any, index: number) => {
      return (
        <p key={index} className="text-center">
          {stats.stat.name}: {stats["base_stat"]} / Effort: {stats.effort}
        </p>
      );
    });
  }

  return (
    <>
      <div className="w-full bg-red-200">
        <div className="mx-auto bg-white md:w-3/4 max-height-[65vh] max-w-7xl">
          <img
            src={pokemon.sprites.other["official-artwork"]["front_default"]}
            alt={`Pokemon: ${pokemon.name}`}
            className="mx-auto md:w-3/4 max-height-[65vh] max-w-7xl"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 mb-4">
        <p>ID: {pokemon.id}</p>
        <p>Name: {pokemon.name}</p>
        <p>Species: {pokemon.species.name}</p>
        <div className="w-3/4 p-6 bg-gray-200 rounded-lg md:w-1/3">
          <p className="text-center">Abilities:</p>
          {displayAbilities()}
        </div>
        <p>Base Exp: {pokemon["base_experience"]}</p>
        {displayForms()}
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <div className="w-3/4 p-6 bg-gray-200 rounded-lg md:w-1/3">
          <p className="text-center">Stats:</p>
          {displayStats()}
        </div>
      </div>
    </>
  );
}
