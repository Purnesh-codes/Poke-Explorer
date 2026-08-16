import { createFileRoute, useRouter } from "@tanstack/react-router";
import PokemonDetailsView from "../../components/PokemonDetailsView";
import Loading from "../../components/Loading";
import { usePokemonDetails } from "../../hooks";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import checkBrokenImage from "../../utils/checkBrokenImage";
// import Image from "../../components/Image";

export const Route = createFileRoute("/pokemon-details/$pokemonName")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pokemonName } = Route.useParams();
  const {
    data: pokemonData,
    isPending,
    isError,
  } = usePokemonDetails(pokemonName);

  const router = useRouter();

  //Debounce Loading Pattern more to read about
  const [showLoadingUi, setShowLoadingUi] = useState(false);
  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;

    if (isPending) {
      delayTimer = setTimeout(() => setShowLoadingUi(true), 250);
    } else {
      setShowLoadingUi(false);
    }

    return () => clearTimeout(delayTimer);
  }, [isPending]);

  //---ERROR STATE COMPONENT--
  if (isPending) {
    if (!showLoadingUi) return <div className="min-h-screen bg-slate-950" />;
    return (
      <div className="mt-20 flex h-100 items-center justify-center text-center text-xl text-slate-400">
        <div className="capitalize">
          <Loading />
          {pokemonName}, i choose you!
        </div>
      </div>
    );
  }

  //---ERROR STATE COMPONENT--
  //TODO: MAKE COMPONENT FOR IT
  if (isError || !pokemonData) {
    return (
      <div className="mt-20 text-center text-xl text-red-500">
        Failed to load Pokémon data.
      </div>
    );
  }

  //Utility function to swap out broken images
  const { imageFolder } = checkBrokenImage(pokemonData.id);

  return (
    <div className="see-dotte mx-auto">
      <div className="hidde">
        <button
          onClick={() => router.history.back()}
          className="group cursor-pointer rounded-2xl bg-slate-800 px-4 py-2 text-lg transition-colors duration-300 hover:bg-slate-700"
        >
          <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
        </button>
      </div>
      <div className="see-dotte mx-auto mt-5 flex flex-wrap justify-center gap-8 md:flex-nowrap lg:justify-start">
        <div className="group md flex items-center justify-center rounded-3xl border-3 border-slate-600 bg-slate-900 p-2 transition-transform duration-200 hover:scale-102">
          <img
            src={`https://wsrv.nl/?url=raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${imageFolder}/${pokemonData.id}.png`}
            alt={`${pokemonData.name}-image`}
            className="aspect-square h-auto w-85 overflow-hidden object-cover transition-transform duration-300 group-hover:scale-115 lg:w-130"
          />

          {/* <Image
              imageUrl={`https://wsrv.nl/?url=raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.id}.png`}
            /> */}
        </div>

        <PokemonDetailsView pokemon={pokemonData} />
      </div>
    </div>
  );
}
