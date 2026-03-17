import DynamicDisplay from '@/components/DynamicDisplay';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
           <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Dynamic UI</span>
          </h1>
        </header>

        <DynamicDisplay />

      </div>
    </main>
  );
}
