import { ArrowRight, BarChart3, Bot, BrainCircuit, ChevronRight, CloudSun, MapPinned, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";

const features = [
  [BrainCircuit,"Predictive AQI","Multi-model machine learning transforms pollutant and weather signals into decision-ready AQI."],
  [Sparkles,"Explain every result","Local and global factor intelligence shows exactly what moved each prediction."],
  [MapPinned,"City-scale awareness","Hotspot maps and seven-day outlooks reveal where action matters most."],
  [ShieldCheck,"Health-first guidance","Audience-specific recommendations turn air data into safer daily decisions."],
  [BarChart3,"Scenario planning","Test emission-reduction scenarios and quantify their expected impact."],
  [Bot,"Ask Aeris","An always-available assistant answers practical air-quality questions without paid APIs."],
];
export default function Home() {
  return <div className="min-h-screen overflow-hidden bg-[#07130f] text-white">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Link to="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-ink"><Wind size={21}/></span><b className="font-display text-lg">Aeris AI</b></Link><div className="hidden gap-7 text-sm text-white/55 md:flex"><a href="#platform">Platform</a><a href="#intelligence">Intelligence</a><Link to="/about">Research</Link></div><div className="flex items-center gap-2"><ThemeToggle/><Link className="btn-primary !bg-mint !text-ink" to="/dashboard">Open console <ArrowRight size={15}/></Link></div></nav>
    <main>
      <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-20 lg:px-8 lg:pt-28">
        <div className="absolute left-[65%] top-16 h-[450px] w-[450px] rounded-full bg-emerald-400/10 blur-[100px]"/>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="relative z-10 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[.07] px-3 py-1.5 text-xs text-mint"><Sparkles size={13}/> Explainable environmental intelligence</span>
          <h1 className="mt-8 max-w-4xl font-display text-5xl font-extrabold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-[84px]">See the air.<br/><span className="bg-gradient-to-r from-mint to-lime bg-clip-text text-transparent">Change the outcome.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/55">Predict, explain and manage air quality with a transparent AI command center built for cities, researchers and healthier communities.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link className="btn-primary !bg-mint !px-6 !py-4 !text-ink" to="/dashboard">Explore live intelligence <ArrowRight size={17}/></Link><Link className="btn-secondary !border-white/15 !bg-white/5 !px-6 !py-4" to="/prediction">Run a prediction</Link></div>
        </motion.div>
        <div className="relative mt-20 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[.05] p-5 backdrop-blur-xl lg:p-7"><div className="flex items-center justify-between"><span className="text-sm text-white/45">National air pulse</span><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">● 6 cities live</span></div><div className="mt-7 grid grid-cols-3 gap-3">{[["Delhi",315,"Severe"],["Nagpur",171,"Poor"],["Bengaluru",89,"Moderate"]].map(([city,aqi,status])=><div key={city} className="rounded-2xl bg-black/20 p-4"><p className="text-xs text-white/40">{city}</p><p className="mt-2 font-display text-4xl font-bold">{aqi}</p><p className={`mt-3 text-xs ${aqi as number>300?"text-purple-300":aqi as number>100?"text-orange-300":"text-yellow-300"}`}>{status}</p></div>)}</div><div className="mt-5 flex h-28 items-end gap-2">{[42,64,49,76,58,86,69,95,72,82,62,54,68,48,59,42,56,35,43,29].map((h,i)=><i key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-800 to-mint/80" style={{height:`${h}%`}}/>)}</div></div>
          <div className="rounded-[2rem] bg-gradient-to-br from-mint to-[#a9ff7d] p-7 text-ink"><CloudSun size={26}/><p className="mt-10 text-xs font-bold uppercase tracking-[.18em]">Tomorrow · 8:00 AM</p><p className="mt-3 font-display text-6xl font-extrabold tracking-tighter">148</p><p className="mt-1 font-semibold">AQI forecast · improving</p><div className="mt-8 border-t border-ink/15 pt-5 text-sm leading-6 text-ink/65">Morning dispersion should reduce fine particulate concentration by approximately 12%.</div></div>
        </div>
      </section>
      <section id="platform" className="bg-[#edf5f0] py-24 text-ink"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">One connected platform</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight lg:text-5xl">From raw pollution to clear action.</h2></div><p className="max-w-md text-sm leading-7 text-slate-500">A complete intelligence loop spanning measurement, prediction, explanation, forecasting and intervention.</p></div><div id="intelligence" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon,title,text],i)=><motion.div whileHover={{y:-5}} key={title as string} className="rounded-[1.5rem] border border-emerald-950/10 bg-white/70 p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-950 text-mint"><Icon size={20}/></span><h3 className="mt-8 font-display text-lg font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text as string}</p><Link to="/dashboard" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">Explore <ChevronRight size={15}/></Link></motion.div>)}</div></div></section>
    </main>
  </div>;
}
