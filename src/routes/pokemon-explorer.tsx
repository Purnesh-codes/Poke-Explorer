import { createFileRoute } from "@tanstack/react-router";
import PokemonCard from "../components/PokemonCard";
import { useMasterPokemonList, usePokemonTypeList } from "../hooks";
import Search from "../components/Search";
import CardLoading from "../components/CardLoading";
import { z } from "zod";
import Pagination from "../components/Pagination";
import PokemonNotFound from "../components/PokemonNotFound";

//---ZOD SCHEMA FOR URL VALIDATION---
const pokemonSearchSchema = z.object({
  page: z.number().optional().catch(undefined),
  search: z.string().max(30).optional().catch(undefined),
  types: z.array(z.string()).optional().catch(undefined),
});

export const Route = createFileRoute("/pokemon-explorer")({
  component: RouteComponent,
  validateSearch: (search) => pokemonSearchSchema.parse(search),
});

function RouteComponent() {
  const { page = 1, search = "", types = [] } = Route.useSearch();
  const { data: masterPokemonList, isLoading } = useMasterPokemonList();
  const { data: typeList } = usePokemonTypeList(types);

  const baseArray = (types.length > 0 ? typeList : masterPokemonList) || [];

  const listToProcess = search
    ? baseArray.filter((p: any) => {
        if (!p || !p.name) return false;
        const pokemonName = p.name.toLowerCase();
        const searchTerm = search.trim().toLowerCase();
        return pokemonName.includes(searchTerm);
      })
    : baseArray;

  // --- Calculate start and end points based on the page number ---
  const itemsPerPage = 20;
  const currentPage = page;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePokemons = listToProcess?.slice(startIndex, endIndex);
  const totalPages = listToProcess
    ? Math.ceil(listToProcess.length / itemsPerPage)
    : 1;

  return (
    <>
      <Search />
      {search && listToProcess.length === 0 ? (
        <PokemonNotFound searchQuery={search} />
      ) : null}

      {isLoading ? (
        <CardLoading />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-7 xl:grid-cols-4 2xl:grid-cols-5">
          {visiblePokemons?.map((pokemon: any) => (
            <PokemonCard
              id={pokemon.url.split("/").at(-2)}
              key={pokemon.name}
              name={pokemon.name}
            />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
