import { ArrowDownRight, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { aqiColor } from "../utils/aqiUtils";

export function AQICard({ aqi, category, city, main }: { aqi: number; category: string; city: string; main: string }) {
  const color = aqiColor(aqi);
  return <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} className="relative overflow-hidden rounded-[1.75rem] bg-ink p-6 text-white shadow-glow lg:p-7">
    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{background: color}}/>
    <div className="relative flex items-start justify-between"><div><span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-3 py-1 text-xs text-white/65"><Radio size={12} className="text-mint"/>Live estimate</span><p className="mt-5 text-sm text-white/45">{city} atmosphere</p></div><span className="rounded-full px-3 py-1 text-xs font-bold" style={{color, background:`${color}20`}}>{category}</span></div>
    <div className="relative mt-1 flex items-end gap-3"><strong className="font-display text-7xl font-extrabold tracking-[-.07em]">{Math.round(aqi)}</strong><span className="mb-3 text-sm text-white/45">AQI<br/>index</span></div>
    <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="text-white/45">Primary pollutant</span><b>{main}</b></div>
    <div className="relative mt-2 flex items-center gap-2 text-xs text-emerald-300"><ArrowDownRight size={14}/> 6.4% cleaner than yesterday</div>
  </motion.div>;
}
