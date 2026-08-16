export default function CardLoading() {
  // A cleaner way to generate an array of 20 items AI GENERATED 
  const cards = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-7 xl:grid-cols-4 2xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card}
    
          className="flex flex-col items-center gap-4 rounded-3xl border-2 border-slate-600 bg-slate-900/50 p-4 animate-pulse"
        >
    
          <div className="flex w-full items-center justify-center">
             <div className="aspect-square w-full rounded-2xl bg-slate-700/50"></div>
          </div>
          

          <div className="p-4">
            <div className="h-8 w-32 rounded-full bg-slate-700/50"></div>
          </div>
        </div>
      ))}
    </div>
  );
}