import { useEffect, useState } from "react"
import PokemonCards from "./PokemonCards"
import Loader from "./Loader"

const Pokemon = () => {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=40"

    const fetchPokemon = async () => {
        try{
            const response = await fetch(API)
            const data = await response.json()
            console.log(data)
            const detailPokemondata = data.results.map(async(curPokemon) => {
                const res = await fetch(curPokemon.url)
                const data = await res.json()
                return data;
            })
            const detailResponse = await Promise.all(detailPokemondata)
            setPokemon(detailResponse)
            setLoading(false)
            console.log(detailResponse)
        }catch (error){
            console.log(error)
            setLoading(false)
            setError("Something Went Wrong....pls check")
        }
    }

    useEffect(() => {
        fetchPokemon()
    },[])

    const searchData = pokemon.filter((curPokemon) => curPokemon.name.toLowerCase().includes(search.toLowerCase()));

    if(loading) return <Loader/>

    if(error) return <p>{error.message}</p>

    return (
        <>
            <section className="font-sans bg-green-200">
                <header className="w-full py-8">
                    <h1 className="font-extrabold text-3xl flex justify-center">Lets Catch Pokemon</h1>
                </header>

                <div className="flex justify-center py-4">
                    <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-b-2 shadow-2xl outline-none"
                    />
                </div>

                <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
                        {searchData.map((curpokemon) => (
                        <PokemonCards key={curpokemon.id} pokemonData={curpokemon}/>))}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Pokemon