import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const names: Record<string,string> = { dashboard: "Air quality overview", prediction: "AQI prediction", "explainable-ai": "Explainable intelligence", twin: "Urban air digital twin", intervention: "Causal intervention lab", "exposure-lab": "Personal exposure & model drift", forecasting: "Forecast lab", hotspots: "Pollution hotspots", "what-if": "What-if studio", health: "Health guidance", reports: "Reports center", analytics: "Model analytics", chatbot: "Ask Aeris", about: "About the system" };

export function Navbar({ openMenu }: { openMenu: () => void }) {
  const key = useLocation().pathname.split("/")[1] || "dashboard";
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query,setQuery] = useState("");
  const [focused,setFocused] = useState(false);
  const destinations = useMemo(() => [
    ["Overview dashboard","/dashboard"],["AQI prediction","/prediction"],["Explainable AI","/explainable-ai"],
    ["Aeris Digital Twin","/twin"],["Causal intervention","/intervention"],["Exposure and drift","/exposure-lab"],
    ["Forecast lab","/forecasting"],["Pollution hotspots","/hotspots"],["What-if analysis","/what-if"],
    ["Health recommendations","/health"],["Reports center","/reports"],["Model analytics","/analytics"],
    ["Ask Aeris chatbot","/chatbot"],["About the project","/about"],
  ],[]);
  const matches = query.trim() ? destinations.filter(([label]) => label.toLowerCase().includes(query.toLowerCase())).slice(0,6) : destinations.slice(0,6);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); inputRef.current?.focus();
      }
      if (event.key === "Escape") { setQuery(""); inputRef.current?.blur(); }
    };
    window.addEventListener("keydown",handler);
    return () => window.removeEventListener("keydown",handler);
  },[]);
  const openResult = (path:string) => { navigate(path); setQuery(""); setFocused(false); };
  return <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-emerald-950/[.06] bg-[#edf5f0]/80 px-4 backdrop-blur-xl dark:border-white/[.06] dark:bg-[#06100d]/80 lg:px-8">
    <div className="flex items-center gap-3"><button className="lg:hidden" onClick={openMenu}><Menu/></button><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-emerald-600 dark:text-mint">Command center</p><h1 className="font-display text-lg font-bold">{names[key] || "Aeris AI"}</h1></div></div>
    <div className="flex items-center gap-2">
      <div className="relative hidden md:block">
        <div className="flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white/50 px-3 py-2 text-sm text-slate-400 dark:border-white/10 dark:bg-white/5">
          <Search size={16}/>
          <input ref={inputRef} aria-label="Search intelligence" className="w-48 bg-transparent text-current outline-none placeholder:text-slate-400" placeholder="Search intelligence…" value={query} onFocus={()=>setFocused(true)} onBlur={()=>setTimeout(()=>setFocused(false),120)} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&matches[0])openResult(matches[0][1])}}/>
          <kbd className="text-xs">⌘K</kbd>
        </div>
        {focused&&<div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-emerald-950/10 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-[#10231e]">{matches.length?matches.map(([label,path])=><button key={path} onMouseDown={()=>openResult(path)} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm hover:bg-emerald-50 dark:hover:bg-white/[.06]"><span>{label}</span><span className="text-xs text-slate-400">↗</span></button>):<p className="p-4 text-center text-sm text-slate-400">No matching module</p>}</div>}
      </div>
      <button className="relative rounded-xl border border-black/5 bg-white/60 p-2.5 dark:border-white/10 dark:bg-white/5"><Bell size={18}/><i className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500"/></button>
      <ThemeToggle/>
      <div className="ml-1 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-800 text-sm font-bold text-white">AQ</div>
    </div>
  </header>;
}
