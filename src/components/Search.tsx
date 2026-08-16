import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import TypeFilterDropdown from "./TypeFilterDropdown";

export default function Search() {
  const { search } = useSearch({ from: "/pokemon-explorer" });
  const currentUrlSearch = search || "";
  const [localSearch, setLocalSearch] = useState(currentUrlSearch);
  const navigate = useNavigate({ from: "/pokemon-explorer" });

  // --- Debounced Search Hook ---
  useEffect(() => {
    if (localSearch === currentUrlSearch) return;

    const delay = setTimeout(() => {
      navigate({
        search: (prev) => ({
          ...prev,
          search: localSearch || undefined,
          page: undefined,
        }),
        replace: true,
      });
    }, 300);

    return () => clearTimeout(delay);
  }, [localSearch, currentUrlSearch, navigate]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch(event.target.value);
  }

  function clearSearch() {
    setLocalSearch("");
  }

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row"
    >
      {/* Input Wrapper for relative icon positioning */}
      <div className="relative w-full flex-1 lg:w-100 lg:flex-none">
        {/* Left Search Icon */}
        <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-500" />

        <input
          value={localSearch}
          onChange={handleChange}
          autoCorrect="off"
          autoCapitalize="words"
          type="text"
          placeholder="Search for a Pokémon"
          className="focus:border-primary w-full rounded-2xl border-2 border-slate-800 bg-slate-800 py-2 pr-10 pl-10 text-base font-medium text-slate-100 transition-colors duration-200 placeholder:text-slate-600 hover:border-slate-700 focus:outline-none"
        />

        {/* Right X Button (Only shows if there is text in the input) */}
        {localSearch && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Filter Dropdown Wrapper */}
      <div className="w-full sm:w-auto">
        <TypeFilterDropdown />
      </div>
    </form>
  );
}
