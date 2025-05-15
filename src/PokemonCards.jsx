
const PokemonCards = ({pokemonData}) => {
    return (
    <>
        <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:scale-[0.99] hover:shadow-xl">
            <figure className="w-24 h-24 mb-4">
                    <img 
                    src={pokemonData.sprites.other.dream_world.front_default}
                    alt={pokemonData.name}
                    className="w-full h-full object-contain"
                    />
            </figure>
        <h1 className="text-xl font-bold capitalize mb-2">{pokemonData.name}</h1>
        <div>
                <p className="text-sm font-semibold mb-4 capitalize bg-green-300 px-3 py-1 rounded-2xl">{pokemonData.types.map((curtype)=> curtype.type.name).join(", ")}</p>
        </div>
        <div className="text-sm space-y-1">
                <p><span className="font-semibold">Height : </span>{pokemonData.height}</p>
                <p><span className="font-semibold">Weight : </span>{pokemonData.weight}</p>
                <p><span className="font-semibold">Speed : </span>{pokemonData.stats[5]?.base_stat}</p>
        </div>
        </div>
    </>
    )
}

export default PokemonCards;

