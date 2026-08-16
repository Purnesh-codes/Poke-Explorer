import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-slate-950 p-4 text-white md:px-10">
      {/*Fixed nav bar*/}
      <Navbar />

      {/*Main section that will load the page*/}
      <main className="see- mt-25 flex w-full grow flex-col gap-4 px-2 sm:mt-30 lg:w-5/6">
        <Outlet />
      </main>

      {/*Fixed footer component*/}
      <Footer />
    </div>
  );
}
