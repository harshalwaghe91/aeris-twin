import { Bell, Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const names: Record<string,string> = { dashboard: "Air quality overview", prediction: "AQI prediction", "explainable-ai": "Explainable intelligence", twin: "Urban air digital twin", intervention: "Causal intervention lab", "exposure-lab": "Personal exposure & model drift", forecasting: "Forecast lab", hotspots: "Pollution hotspots", "what-if": "What-if studio", health: "Health guidance", reports: "Reports center", analytics: "Model analytics", chatbot: "Ask Aeris", about: "About the system" };

export function Navbar({ openMenu }: { openMenu: () => void }) {
  const key = useLocation().pathname.split("/")[1] || "dashboard";
  return <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-emerald-950/[.06] bg-[#edf5f0]/80 px-4 backdrop-blur-xl dark:border-white/[.06] dark:bg-[#06100d]/80 lg:px-8">
    <div className="flex items-center gap-3"><button className="lg:hidden" onClick={openMenu}><Menu/></button><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-emerald-600 dark:text-mint">Command center</p><h1 className="font-display text-lg font-bold">{names[key] || "Aeris AI"}</h1></div></div>
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 rounded-xl border border-emerald-950/10 bg-white/50 px-3 py-2 text-sm text-slate-400 md:flex dark:border-white/10 dark:bg-white/5"><Search size={16}/>Search intelligence… <kbd className="ml-8 text-xs">⌘K</kbd></div>
      <button className="relative rounded-xl border border-black/5 bg-white/60 p-2.5 dark:border-white/10 dark:bg-white/5"><Bell size={18}/><i className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500"/></button>
      <ThemeToggle/>
      <div className="ml-1 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-800 text-sm font-bold text-white">AQ</div>
    </div>
  </header>;
}
