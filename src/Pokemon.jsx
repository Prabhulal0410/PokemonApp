import { useEffect, useState } from "react";
import PokemonCards from "./PokemonCards";
import Loader from "./Loader";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=40";

  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const detailPokemondata = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailResponse = await Promise.all(detailPokemondata);
      setPokemon(detailResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Something went wrong. Please check.");
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="font-sans bg-gray-900 min-h-screen py-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Let's Catch Pokémon</h1>
        <p className="text-gray-400">Explore and search your favorite Pokémon</p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-b-2 border-gray-600 focus:border-blue-500 outline-none px-4 py-2 w-72 text-white bg-gray-800 placeholder-gray-400 shadow-md rounded-md transition-all duration-200"
        />
      </div>

      {/* Pokémon Cards Grid */}
      <div className="px-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchData.map((curPokemon) => (
            <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Pokemon;
