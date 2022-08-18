import React from "react";
import useFetch from "../../custom-hooks/fetch";

export function DisplayAbilities(props: { url: any }) {
  const { data: ability, loading, error } = useFetch(props.url);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  return (
    <>
      <p className="mt-4">ID: {ability.id}</p>
      <p>Name: {ability.name}</p>
      <p>
        Description:{" "}
        {ability["effect_entries"].length === 0
          ? "unknown"
          : ability["effect_entries"][0]["short_effect"]}
      </p>
      <p>{ability.generation.name}</p>
    </>
  );
}
