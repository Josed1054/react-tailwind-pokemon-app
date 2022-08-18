import React, { useState } from "react";
import useFetch from "../../custom-hooks/fetch";
import { DisplayLocation } from "../display-location";

export function DisplayCarousel() {
  const [randomNumber, setRandomNumber] = useState(
    Math.round(Math.random() * 761)
  );

  const {
    data: locations,
    loading,
    error,
  } = useFetch(
    `https://pokeapi.co/api/v2/location?offset=${randomNumber}&limit=25`
  );

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function displayCarousel() {
    return locations.results.map((location: any, index: number) => (
      <DisplayLocation key={index} url={location.url} />
    ));
  }

  return (
    <div className="w-full">
      <p className="text-center">Locations:</p>
      <div className="flex gap-4 overflow-x-scroll w-[90vw] mx-auto my-4">
        {displayCarousel()}
      </div>
    </div>
  );
}
