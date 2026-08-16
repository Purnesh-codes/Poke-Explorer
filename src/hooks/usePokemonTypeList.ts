import { useQueries } from "@tanstack/react-query";

export type PokemonBasic = {
  name: string;
  url: string;
};

type PokeAPITypeResponse = {
  pokemon: {
    pokemon: PokemonBasic;
  }[];
};

export default function usePokemonTypeList(types: string[] = []) {
  return useQueries({
    queries: types.map((type) => ({
      queryKey: ["pokemon", "type", type],
      queryFn: () => getPokemonTypeList(type),

      select: (data: PokeAPITypeResponse) =>
        data.pokemon.map((item: { pokemon: PokemonBasic }) => item.pokemon),
    })),

    combine: (results) => {
      const isLoading = results.some((result) => result.isPending);

      const arraysOfPokemon = results
        .map((result) => result.data)
        .filter(Boolean) as PokemonBasic[][];

      let finalData = undefined;

      if (arraysOfPokemon.length > 0) {
        //For UX so that user can see the filter working
        const allPokemons = [...arraysOfPokemon].reverse().flat();

        const uniqueMap = new Map(allPokemons.map((p) => [p.name, p]));

        finalData = Array.from(uniqueMap.values());
      }

      return { data: finalData, isLoading };
    },
  });
}

async function getPokemonTypeList(type: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

  if (!response.ok) throw new Error("Fetching pokemon type failed !");

  const data = await response.json();
  return data;
}
