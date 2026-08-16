import { Link } from "@tanstack/react-router";
import Image from "./Image";
import checkBrokenImage from "../utils/checkBrokenImage";
type PokemonCardTypes = {
  name: string;
  id?: number;
};

export default function PokemonCard({ name, id }: PokemonCardTypes) {
  //Utility function to swap out broken images
  const { imageFolder } = checkBrokenImage(id);

  return (
    <Link
      className="group transition-transform duration-200 hover:scale-102"
      to="/pokemon-details/$pokemonName"
      params={{ pokemonName: `${name}` }}
    >
      <div className="card-wapper flex flex-col items-center gap-4 rounded-3xl border-2 border-slate-600 bg-slate-900 p-4">
        <div className="flex w-full items-center justify-center">
          <Image
            imageUrl={`https://wsrv.nl/?url=raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${imageFolder}/${id}.png&w=400&output=webp`}
          />

          {/* <img
              src={`https://wsrv.nl/?url=raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png&w=300&output=webp`}
              alt="pokemon-image"
              className="h-auto w-full overflow-hidden object-cover transition-transform duration-300 group-hover:scale-125"
            /> */}
        </div>

        <div className="group inline-block cursor-pointer p-4">
          <span className="relative text-3xl font-semibold text-slate-400 capitalize after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-200 after:transition-all after:duration-300 group-hover:after:w-full">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}
