import { Activity, BarChart3, Bot, BrainCircuit, FileText, Fingerprint, HeartPulse, LayoutDashboard, MapPinned, Microscope, Orbit, SlidersHorizontal, Sparkles, UserRoundCog, Wind } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/prediction", "AQI prediction", BrainCircuit],
  ["/explainable-ai", "Explainable AI", Microscope],
  ["/twin", "Aeris Digital Twin", Orbit],
  ["/intervention", "Causal intervention", Fingerprint],
  ["/exposure-lab", "Exposure & drift", UserRoundCog],
  ["/forecasting", "Forecast lab", Activity],
  ["/hotspots", "Hotspot map", MapPinned],
  ["/what-if", "What-if studio", SlidersHorizontal],
  ["/health", "Health guide", HeartPulse],
  ["/reports", "Reports", FileText],
  ["/analytics", "Model analytics", BarChart3],
  ["/chatbot", "Ask Aeris", Bot],
];

export function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#07130f]/[.98] p-5 text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
    <NavLink to="/" onClick={close} className="mb-8 flex items-center gap-3 px-2">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-ink shadow-glow"><Wind size={21}/></span>
      <span><b className="font-display text-lg">Aeris Twin</b><small className="block text-[10px] uppercase tracking-[.18em] text-emerald-200/60">Causal air intelligence</small></span>
    </NavLink>
    <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Intelligence suite</div>
    <nav className="no-scrollbar flex-1 space-y-1 overflow-y-auto">
      {navigation.map(([to, label, Icon]) => <NavLink key={to as string} to={to as string} onClick={close} className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isActive ? "bg-mint font-semibold text-ink" : "text-white/60 hover:bg-white/5 hover:text-white"}`}><Icon size={17}/><span>{label as string}</span></NavLink>)}
    </nav>
    <div className="mt-4 rounded-2xl border border-mint/15 bg-mint/[.07] p-4">
      <Sparkles size={18} className="mb-3 text-mint"/>
      <p className="text-sm font-semibold">Model online</p>
      <p className="mt-1 text-xs leading-5 text-white/45">Explainable predictions, live simulation and seven-day intelligence.</p>
    </div>
  </aside>;
}
