import React from "react";
import useFetch from "../../custom-hooks/fetch";

export function DisplayLocation(props: { url: any }) {
  const { data: location, loading, error } = useFetch(props.url);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(new Error(error));
    return <h2>Error</h2>;
  }

  function displayAreas() {
    return location.areas.map((area: any, index: number) => (
      <p key={index}>{area.name}</p>
    ));
  }

  return (
    <div className="p-6 bg-gray-200 rounded-lg flex-none md:w-[20vw] min-w-[80%] md:min-w-[15vw]">
      <p>Location: {location.id}</p>
      <p>Name: {location.name}</p>
      <p>
        Region: {location.region !== null ? location.region.name : "unknown"}
      </p>
      <p>Areas:</p>
      {displayAreas()}
    </div>
  );
}
