import {
  ShieldCheck,
  Heart,
  Swords,
  Shield,
  ShieldAlert,
  Zap,
  Flame,
} from "lucide-react";
import { StatGauge } from "./StatGauge";

// ---STATS CONFIG---
const STAT_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    strokeColor: string;
    glowColor: string;
    icon: React.ReactNode;
  }
> = {
  hp: {
    label: "Hp",
    color: "text-red-500",
    strokeColor: "#ff2a4b",
    glowColor: "rgba(255, 42, 75, 0.6)",
    icon: <Heart className="h-6 w-6 fill-current" />,
  },
  attack: {
    label: "Attack",
    color: "text-pink-500",
    strokeColor: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.6)",
    icon: <Swords className="h-6 w-6" />,
  },
  defense: {
    label: "Defense",
    color: "text-green-500",
    strokeColor: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.6)",
    icon: <Shield className="h-6 w-6 fill-current" />,
  },
  "special-attack": {
    label: "Special Attack",
    color: "text-orange-500",
    strokeColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.6)",
    icon: <Flame className="h-6 w-6 fill-current" />,
  },
  "special-defense": {
    label: "Special Defense",
    color: "text-indigo-500",
    strokeColor: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.6)",
    icon: <ShieldAlert className="h-6 w-6 fill-current" />,
  },
  speed: {
    label: "Speed",
    color: "text-cyan-400",
    strokeColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.6)",
    icon: <Zap className="h-6 w-6 fill-current" />,
  },
};

// ---DATA SHAPE---
type PokemonDetailsProps = {
  pokemon: {
    name: string;
    types: string[];
    abilities: string[];
    stats: { name: string; value: number }[];
  };
};

export default function PokemonDetailsView({ pokemon }: PokemonDetailsProps) {
  // Safety check: if data is not loaded yet, return nothing or a loader
  if (!pokemon) return null;

  return (
    <div className="flex max-w-md flex-col gap-5 rounded-3xl bg-transparent px-2 text-white shadow-2xl">
      {/* Dynamic Title */}
      <h1 className="text-4xl font-bold tracking-tight text-white capitalize">
        {pokemon.name}
      </h1>

      {/* Dynamic Types (Simplified) */}
      <div className="flex flex-col gap-2">
        <span className="text font-semibold text-slate-400">Types</span>
        <div className="flex flex-wrap items-center gap-3">
          {pokemon.types.map((type) => (
            <div
              key={type}
              className="rounded-full border border-slate-700 bg-slate-800/70 px-5 py-1.5 font-bold text-slate-100 capitalize"
              style={{
                filter: `drop-shadow(0 0 6px #314158 )`,
              }}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Abilities */}
      <div className="flex flex-col gap-2">
        <span className="text- font-semibold text-slate-400">Abilities</span>
        <div className="flex flex-wrap items-center gap-3">
          {pokemon.abilities.map((ability) => (
            <div
              key={ability}
              className="flex items-center gap-2 rounded-full border border-[#3b4382] bg-[#232959] px-4 py-1.5 font-bold text-slate-100 capitalize shadow-md"
              style={{
                filter: `drop-shadow(0 0 6px #232959)`,
              }}
            >
              <ShieldCheck className="h-6 w-6 fill-indigo-200/20 text-indigo-300" />
              <span>{ability.replace("-", " ")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Stats */}
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-slate-400">Stats</span>

        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-[#161e38] bg-[#0c1228] p-3">
          {pokemon.stats.map((stat) => {
            const config = STAT_CONFIG[stat.name];

            // If API returns a weird stat name not in config, skip it safely
            if (!config) return null;

            return (
              <StatGauge
                key={stat.name}
                label={config.label}
                value={stat.value}
                color={config.color}
                strokeColor={config.strokeColor}
                glowColor={config.glowColor}
                icon={config.icon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
