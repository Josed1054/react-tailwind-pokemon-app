import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import useFetch from "../../custom-hooks/fetch";

export function DisplayPokemonMin(props: { pokemonURL: any }) {
  const { data: pokemon, loading, error } = useFetch(props.pokemonURL);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function displayAbilities() {
    return pokemon.abilities.map((abilities: any, index: number) => {
      return <li key={index}>{abilities.ability.name}</li>;
    });
  }

  return (
    <div
      key={pokemon.id}
      className={
        "sm:flex-[40%] sm:w-[45%] md:flex-[30%] md:w[35%] lg:flex-[20%] lg:w[25%] w-full p-3 min-h-[15vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative"
      }
    >
      <img
        src={pokemon.sprites.other["official-artwork"]["front_default"]}
        alt={`Pokemon: ${pokemon.name}`}
        className="w-full"
      />
      <div className="absolute top-0 left-0 bg-red-200 rounded-tl-lg z-[80]">
        <p className="m-2">ID: {pokemon.id}</p>
      </div>
      <p>Name: {pokemon.name}</p>
      <p>Species: {pokemon.species.name}</p>
      <p>Abilities:</p>
      <ul>{displayAbilities()}</ul>
      <div className="absolute top-3 right-4 cursor-pointer z-[80]">
        <Link to={`/pokemon/${pokemon.id}`}>
          <MdInfoOutline className="scale-150 bg-red-200 rounded-full" />
        </Link>
      </div>
    </div>
  );
}
