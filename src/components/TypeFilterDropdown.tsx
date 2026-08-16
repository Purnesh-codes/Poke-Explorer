import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../routes/pokemon-explorer";
import {
  Flame,
  Droplet,
  Leaf,
  Zap,
  Circle,
  Sword,
  Feather,
  Skull,
  Mountain,
  Sparkles,
  Bug,
  Diamond,
  Ghost,
  Moon,
  Shield,
  Star,
  Snowflake,
  Check,
  Filter,
  X,
} from "lucide-react";

const TYPE_ICONS: Record<string, React.ElementType> = {
  normal: Circle,
  fire: Flame,
  water: Droplet,
  grass: Leaf,
  electric: Zap,
  ice: Snowflake,
  fighting: Sword,
  poison: Skull,
  ground: Mountain,
  flying: Feather,
  psychic: Sparkles,
  bug: Bug,
  rock: Diamond,
  ghost: Ghost,
  dragon: Flame,
  dark: Moon,
  steel: Shield,
  fairy: Star,
};
const POKEMON_TYPES = Object.keys(TYPE_ICONS);

export default function TypeFilterDropdown() {
  const navigate = useNavigate({ from: "/pokemon-explorer" });
  const { types = [] } = Route.useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleType = (clickedType: string) => {
    let newTypes;
    if (types.includes(clickedType)) {
      newTypes = types.filter((t) => t !== clickedType);
    } else {
      newTypes = [...types, clickedType];
    }

    navigate({
      search: (prev) => ({
        ...prev,
        types: newTypes.length > 0 ? newTypes : undefined,
        page: undefined,
      }),
      replace: true,
    });
    setIsOpen(false);
  };

  // 2. The Clear Logic
  const clearFilters = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        types: undefined, // Destroys Selected types
        page: undefined, // Reset back to page 1
      }),
      replace: true,
    });
    setIsOpen(false); // Close the menu if it was open
  };

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto">
      {/* FILTER BUTTON & DROPDOWN CONTAINER */}
      <div className="relative w-full text-left sm:w-auto" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-4 py-2 text-base font-medium transition-all duration-200 focus:outline-none sm:min-w-32 ${
            isOpen || types.length > 0
              ? "border-emerald-500 bg-slate-800 text-emerald-400"
              : "border-slate-800 bg-slate-800 text-slate-100 hover:bg-slate-700"
          }`}
        >
          <Filter className="h-5 w-5" />
          <span>
            {types.length > 0 ? `Filtered (${types.length})` : "Filters"}
          </span>
        </button>

        {/* DROPDOWN MENU */}
        {isOpen && (
          // Modified absolute positioning: full width on mobile, 72 width on desktop.
          // Aligns left on mobile, right on desktop.
          <div className="absolute left-0 z-50 mt-3 w-full origin-top rounded-2xl border-2 border-slate-700 bg-slate-900 p-2 shadow-2xl sm:right-0 sm:left-auto sm:w-72 sm:origin-top-right">
            <div className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-track]:bg-transparent">
              {POKEMON_TYPES.map((type) => {
                const Icon = TYPE_ICONS[type];
                const isSelected = types.includes(type);
                return (
                  <label
                    key={type}
                    className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ${
                      isSelected
                        ? "bg-slate-800/80 text-emerald-400"
                        : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleType(type)}
                        className="sr-only"
                      />
                      <Icon
                        className={`h-5 w-5 ${isSelected ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"}`}
                      />
                      <span className="text-sm font-semibold tracking-wide capitalize">
                        {type}
                      </span>
                    </div>
                    {isSelected && (
                      <Check
                        className="h-5 w-5 text-emerald-500"
                        strokeWidth={3}
                      />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* CLEAR BUTTON */}
      {types.length > 0 && (
        <button
          type="button"
          onClick={clearFilters}
          title="Clear all filters"
          className="flex shrink-0 cursor-pointer items-center justify-center rounded-2xl border-2 border-slate-800 bg-slate-800 p-2 text-slate-500 transition-all duration-200 hover:border-rose-500 hover:text-rose-400 focus:outline-none"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
