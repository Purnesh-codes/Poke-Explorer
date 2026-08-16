import { useMemo } from "react";
type PokemonNotFoundProps = {
  searchQuery: string;
};

// 54: Psyduck, 79: Slowpoke, 129: Magikarp, 202: Wobbuffet, 399: Bidoof
const FUNNY_POKEMON_IDS = [54, 79, 129, 202, 399];

export default function PokemonNotFound({ searchQuery }: PokemonNotFoundProps) {
  // useMemo ensures it only picks a random one when the component first renders
  const randomId = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * FUNNY_POKEMON_IDS.length);
    return FUNNY_POKEMON_IDS[randomIndex];
  }, []);

  const imageUrl = `https://wsrv.nl/?url=raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${randomId}.png&w=400&output=webp`;

  return (
    <div className="col-span-full flex min-h-[50vh] w-full flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      {/* Image Container */}
      <div className="relative flex aspect-square w-48 items-center justify-center md:w-56">
        <img
          src={imageUrl}
          alt="Confused Pokemon"
          className="relative z-10 h-auto w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Text Content */}
      <div className="flex max-w-sm flex-col gap-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 md:text-4xl">
          Whoops! Not Found
        </h2>
        <p className="text-lg font-medium text-slate-400">
          <span>
            Are You Sure{" "}
            <span className="text-secondary text-xl font-bold">
              "{searchQuery}"
            </span>{" "}
            Is A Pokémon ?
          </span>
        </p>
      </div>
    </div>
  );
}
