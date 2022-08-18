import React from "react";
import { DisplayPokemon } from "../../components/display-pokemon";

export function Pokemon() {
  const pokemonID = window.location.href.split("/").pop();

  return <DisplayPokemon pokemonID={pokemonID} />;
}
