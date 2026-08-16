import { useQuery } from "@tanstack/react-query";

export default function useMasterPokemonList() {
  return useQuery({
    queryKey: ["pokemon", "list", "master"],
    queryFn: getMasterPokemonList,
    staleTime: 1000 * 60 * 5,
  });
}

async function getMasterPokemonList() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
  );
  if (!response.ok) throw new Error("fetch master list failed");
  const masterList = await response.json();
  return masterList.results;
}
