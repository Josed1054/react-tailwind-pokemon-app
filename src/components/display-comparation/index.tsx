import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { SyntheticEvent, useState } from "react";
import useFetch from "../../custom-hooks/fetch";

export function DisplayComparation(props: { pokemonData: any }) {
  const [animation] = useAutoAnimate();

  const [secondPokemon, setSecondPokemon] = useState(false);
  const [secondPokemonValue, setSecondPokemonValue] = useState("");
  const [thirdPokemon, setThirdPokemon] = useState(false);
  const [thirdPokemonValue, setThirdPokemonValue] = useState("");

  const {
    data: pokemons,
    loading,
    error,
  } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=2000");

  const { data: pokemon2, loading: loading2 } = useFetch(secondPokemonValue);

  const { data: pokemon3, loading: loading3 } = useFetch(thirdPokemonValue);

  function addPokemonsNames() {
    if (loading) return <option value="loading">Loading...</option>;
    if (error) return <option value="error">Error</option>;
    return pokemons.results.map((pokemon: any, index: number) => (
      <option key={index} value={pokemon.url}>
        {pokemon.name}
      </option>
    ));
  }

  function updatePokemon(event: SyntheticEvent) {
    const { name } = event.target as HTMLButtonElement;

    if (name === "2") {
      setSecondPokemon((prevValue) => !prevValue);
    } else if (name === "3") {
      setThirdPokemon((prevValue) => !prevValue);
    }
  }

  function addPokemon() {
    if (!secondPokemon) {
      setSecondPokemonValue("");
      setSecondPokemon((prevValue) => !prevValue);
    } else if (!thirdPokemon) {
      setThirdPokemonValue("");
      setThirdPokemon((prevValue) => !prevValue);
    }
  }

  function changePokemonsValues(event: SyntheticEvent) {
    const { name, value } = event.target as HTMLSelectElement;

    if (name === "2") {
      setSecondPokemonValue(value);
    } else if (name === "3") {
      setThirdPokemonValue(value);
    }
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div
      ref={animation as React.RefObject<HTMLDivElement>}
      className="relative w-[90vw] mx-auto my-4"
    >
      <button
        type="button"
        className={`absolute top-0 right-4 cursor-pointer z-[80] text-2xl ${
          secondPokemon && thirdPokemon ? "invisible" : ""
        }`}
        name="add"
        onClick={addPokemon}
      >
        +
      </button>

      <table className="w-full table-fixed">
        <tbody className="w-full">
          <tr>
            <td>ID:</td>
            <td>{props.pokemonData.id}</td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td className="relative">
                    {pokemon2.id}
                    <button
                      type="button"
                      className="absolute top-0 left-[-1rem] cursor-pointer z-[80]"
                      name="2"
                      onClick={updatePokemon}
                    >
                      X
                    </button>
                  </td>
                ) : (
                  <td className="relative">
                    Loading...
                    <button
                      type="button"
                      className="absolute top-0 left-[-1rem] cursor-pointer z-[80]"
                      name="2"
                      onClick={updatePokemon}
                    >
                      X
                    </button>
                  </td>
                )
              ) : (
                <td className="relative">
                  Choose:
                  <button
                    type="button"
                    className="absolute top-0 left-[-1rem] cursor-pointer z-[80]"
                    name="2"
                    onClick={updatePokemon}
                  >
                    X
                  </button>
                </td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td className="relative">
                    {pokemon3.id}
                    <button
                      type="button"
                      className="absolute top-0 left-[-1rem] cursor-pointer z-[80]"
                      name="3"
                      onClick={updatePokemon}
                    >
                      X
                    </button>
                  </td>
                ) : (
                  <td>
                    Loading...
                    <button
                      type="button"
                      className="absolute top-0 left-[-1rem] cursor-pointer z-[80]"
                      name="3"
                      onClick={updatePokemon}
                    >
                      X
                    </button>
                  </td>
                )
              ) : (
                <td className="relative">
                  Choose:
                  <button
                    type="button"
                    className="absolute top-0 left-[-1rem] cursor-pointer z-[80]"
                    name="3"
                    onClick={updatePokemon}
                  >
                    X
                  </button>
                </td>
              ))}
          </tr>
          <tr>
            <td>Image:</td>
            <td>
              <img
                src={props.pokemonData.sprites["front_default"]}
                alt={`Pokemon: ${props.pokemonData.name}`}
              />
            </td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>
                    <img
                      src={pokemon2.sprites["front_default"]}
                      alt={`Pokemon: ${pokemon2.name}`}
                    />
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>
                    <img
                      src={pokemon3.sprites["front_default"]}
                      alt={`Pokemon: ${pokemon3.name}`}
                    />
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
          <tr>
            <td>Name:</td>
            <td>{props.pokemonData.name}</td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>{pokemon2.name}</td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>
                  <select
                    value={secondPokemonValue}
                    onChange={changePokemonsValues}
                    name="2"
                    id="2"
                  >
                    <option value="">Pokemon</option>
                    {addPokemonsNames()}
                  </select>
                </td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>{pokemon3.name}</td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>
                  <select
                    value={thirdPokemonValue}
                    onChange={changePokemonsValues}
                    name="3"
                    id="3"
                  >
                    <option value="">Pokemon</option>
                    {addPokemonsNames()}
                  </select>
                </td>
              ))}
          </tr>
          <tr>
            <td>Base XP:</td>
            <td>{props.pokemonData["base_experience"]}</td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>{pokemon2["base_experience"]}</td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>{pokemon3["base_experience"]}</td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
          <tr>
            <td>HP: / Effort:</td>
            <td>
              {props.pokemonData.stats[0]["base_stat"]} /{" "}
              {props.pokemonData.stats[0].effort}
            </td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>
                    {pokemon2.stats[0]["base_stat"]} /{" "}
                    {pokemon2.stats[0].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>
                    {pokemon3.stats[0]["base_stat"]} /{" "}
                    {pokemon3.stats[0].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
          <tr>
            <td>Attack: / Effort:</td>
            <td>
              {props.pokemonData.stats[1]["base_stat"]} /{" "}
              {props.pokemonData.stats[1].effort}
            </td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>
                    {pokemon2.stats[1]["base_stat"]} /{" "}
                    {pokemon2.stats[1].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>
                    {pokemon3.stats[1]["base_stat"]} /{" "}
                    {pokemon3.stats[1].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
          <tr>
            <td>Defense: / Effort:</td>
            <td>
              {props.pokemonData.stats[2]["base_stat"]} /{" "}
              {props.pokemonData.stats[2].effort}
            </td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>
                    {pokemon2.stats[2]["base_stat"]} /{" "}
                    {pokemon2.stats[2].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>
                    {pokemon3.stats[2]["base_stat"]} /{" "}
                    {pokemon3.stats[2].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
          <tr>
            <td>Special Attack: / Effort:</td>
            <td>
              {props.pokemonData.stats[3]["base_stat"]} /{" "}
              {props.pokemonData.stats[3].effort}
            </td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>
                    {pokemon2.stats[3]["base_stat"]} /{" "}
                    {pokemon2.stats[3].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>
                    {pokemon3.stats[3]["base_stat"]} /{" "}
                    {pokemon3.stats[3].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
          <tr>
            <td>Special Defense: / Effort:</td>
            <td>
              {props.pokemonData.stats[4]["base_stat"]} /{" "}
              {props.pokemonData.stats[4].effort}
            </td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>
                    {pokemon2.stats[4]["base_stat"]} /{" "}
                    {pokemon2.stats[4].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>
                    {pokemon3.stats[4]["base_stat"]} /{" "}
                    {pokemon3.stats[4].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
          <tr>
            <td className="w-1/3">Speed: / Effort:</td>
            <td>
              {props.pokemonData.stats[5]["base_stat"]} /{" "}
              {props.pokemonData.stats[5].effort}
            </td>
            {secondPokemon &&
              (secondPokemonValue !== "" ? (
                !loading2 ? (
                  <td>
                    {pokemon2.stats[5]["base_stat"]} /{" "}
                    {pokemon2.stats[5].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
            {thirdPokemon &&
              (thirdPokemonValue !== "" ? (
                !loading3 ? (
                  <td>
                    {pokemon3.stats[5]["base_stat"]} /{" "}
                    {pokemon3.stats[5].effort}
                  </td>
                ) : (
                  <td>Loading...</td>
                )
              ) : (
                <td>...</td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
