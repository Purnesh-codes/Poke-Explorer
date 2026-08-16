import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";
// import { Code } from "lucide-react";

export default function Navbar() {
  return (
    // Fixed positioning trick: top-4, left-0, right-0, mx-auto keeps it perfectly centered!
    <nav className="fixed top-4 right-0 left-0 z-50 mx-auto flex w-11/12 max-w-260 items-center justify-between rounded-2xl border-2 border-slate-700 bg-slate-900/50 px-4 py-2 shadow-2xl backdrop-blur-xl sm:px-6">
      <Link
        to="/"
        className="group flex w-full items-center gap-3 transition-transform duration-200"
      >
        {/* Remove mr-auto when adding github link */}
        <div className="mr-auto flex h-auto w-16 items-center justify-center rounded-xl bg-transparent transition-transform duration-300 group-hover:scale-105 sm:w-19">
          <img className="h-auto w-20" src={logo} alt="" />
        </div>

        {/* make text 2xl when adding Github link */}
        <span className="text-3xl font-extrabold tracking-wide text-white">
          Poké<span className="text-poke-red">Explorer</span>
        </span>
      </Link>

      {/* <div className="flex items-center gap-2 sm:gap-4">

        <div className="hidden h-6 w-px bg-slate-700 sm:block"></div>

        <a
          href="https://github.com/purnesh-codes"
          target="_blank"
          rel="noreferrer"
          title="View Source Code"
          className="flex items-center justify-center rounded-xl bg-slate-800 p-2 text-slate-300 transition-all duration-200 hover:bg-slate-700 hover:text-white"
        >
          <Code className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
      </div> */}
    </nav>
  );
}
