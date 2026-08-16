import { Link } from "@tanstack/react-router";

// --- TYPES ---
type PaginationVariant = "first" | "prev" | "next" | "last";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

type PaginationButtonProps = {
  variant: PaginationVariant;
  currentPage: number;
  totalPages: number;
};

// --- THE MAIN EXPORTED COMPONENT ---
export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages === 0) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-4 pb-2">
      <div className="flex w-full justify-center gap-2 sm:gap-6">
        <PaginationButton
          variant="first"
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <PaginationButton
          variant="prev"
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <PaginationButton
          variant="next"
          currentPage={currentPage}
          totalPages={totalPages}
        />
        <PaginationButton
          variant="last"
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>

      <span className="text-center font-semibold text-slate-400">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}

// --- THE REUSABLE BUTTON COMPONENT ---
function PaginationButton({
  variant,
  currentPage,
  totalPages,
}: PaginationButtonProps) {
  let targetPage: number | undefined;
  let isDisabled = false;
  let label = "";

  // The Switch Statement controls the unique logic for each button
  switch (variant) {
    case "first":
      targetPage = undefined; // Removes page from URL (safely defaults to 1)
      isDisabled = currentPage === 1;
      label = "<<";
      break;
    case "prev":
      targetPage = currentPage - 1 === 1 ? undefined : currentPage - 1;
      isDisabled = currentPage === 1;
      label = "< Prev";
      break;
    case "next":
      targetPage = currentPage + 1;
      isDisabled = currentPage >= totalPages;
      label = "Next >";
      break;
    case "last":
      targetPage = totalPages === 1 ? undefined : totalPages;
      isDisabled = currentPage >= totalPages;
      label = ">>";
      break;
  }

  //Css styles
  const baseStyles =
    "rounded-2xl border-2 border-slate-800 px-4 py-3 <sm:py-2></sm:py-2> font-semibold text-sm text-nowrap sm:text-lg transition-colors duration-200 sm:px-6";
  const activeStyles = "bg-slate-800 text-white  hover:bg-slate-700";
  const disabledStyles =
    "cursor-not-allowed bg-slate-900/50 text-slate-400 opacity-50";

  return (
    <Link
      to="."
      search={(prev) => ({
        ...prev,
        page: targetPage,
      })}
      disabled={isDisabled}
      className={`${baseStyles} ${isDisabled ? disabledStyles : activeStyles}`}
    >
      {label}
    </Link>
  );
}
