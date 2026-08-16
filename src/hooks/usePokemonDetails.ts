import { useQuery } from "@tanstack/react-query";

export default function usePokemonDetails(name: string) {
  name.trim().toLowerCase();
  return useQuery({
    queryKey: ["pokemon", "detail", name],
    queryFn: () => getPokemonDetails(name),
    staleTime: 1000 * 60 * 5,
  });
}

async function getPokemonDetails(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error("Pokemon Details fetch failed");
  const pokemonDetails = await response.json();

  return {
    id: pokemonDetails.id,
    name: pokemonDetails.name,

    // 't' has a 'type' object, which has a 'name' string
    types: pokemonDetails.types.map(
      (t: { type: { name: string } }) => t.type.name,
    ),

    // 'a' has an 'ability' object, which has a 'name' string
    abilities: pokemonDetails.abilities.map(
      (a: { ability: { name: string } }) => a.ability.name,
    ),

    // 's' has a 'stat' object (with a string name) AND a 'base_stat' number
    stats: pokemonDetails.stats.map(
      (s: { stat: { name: string }; base_stat: number }) => ({
        name: s.stat.name,
        value: s.base_stat,
      }),
    ),
  };
}
