const PokemonCards = ({ pokemonData }) => {
  return (
    <div className="bg-gray-800 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
      
      {/* Pokémon Image */}
      <figure className="w-32 h-32 mb-4">
        <img
          src={pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className="w-full h-full object-contain"
        />
      </figure>

      {/* Pokémon Name */}
      <h1 className="text-2xl font-bold capitalize mb-2 text-white">{pokemonData.name}</h1>

      {/* Pokémon Types */}
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {pokemonData.types.map((typeObj, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize text-white ${
              typeObj.type.name === "fire" ? "bg-red-600" :
              typeObj.type.name === "water" ? "bg-blue-600" :
              typeObj.type.name === "grass" ? "bg-green-600" :
              typeObj.type.name === "electric" ? "bg-yellow-500 text-gray-900" :
              "bg-gray-500"
            }`}
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-300 space-y-1 w-full">
        <p><span className="font-semibold">Height:</span> {pokemonData.height}</p>
        <p><span className="font-semibold">Weight:</span> {pokemonData.weight}</p>
        <p><span className="font-semibold">Speed:</span> {pokemonData.stats[5]?.base_stat}</p>
      </div>
    </div>
  );
};

export default PokemonCards;
