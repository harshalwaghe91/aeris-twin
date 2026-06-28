import { AlertTriangle, Droplets, MapPin, RefreshCw, ThermometerSun, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { API_BASE_URL, endpoints } from "../api/api";
import { AQICard } from "../components/AQICard";
import { ChartCard } from "../components/ChartCard";
import { PollutantCard } from "../components/PollutantCard";
import type { DashboardData } from "../types";
import { aqiColor, shortDate } from "../utils/aqiUtils";

export default function Dashboard() {
  const [city,setCity]=useState("Nagpur"); const [data,setData]=useState<DashboardData>(); const [error,setError]=useState("");
  const load=()=>{setError("");setData(undefined);endpoints.dashboard(city).then(setData).catch(()=>setError(`Unable to reach ${API_BASE_URL}. A free Render service can take up to a minute to wake up.`))};
  useEffect(load,[city]);
  if(error)return <div className="panel flex flex-col items-start gap-4 text-red-500 sm:flex-row sm:items-center"><AlertTriangle className="shrink-0"/><div className="flex-1"><b>Air intelligence is temporarily unavailable</b><p className="mt-1 text-sm text-slate-500">{error}</p></div><button className="btn-primary shrink-0" onClick={load}><RefreshCw size={15}/>Retry connection</button></div>;
  if(!data)return <div className="panel flex items-center gap-3 text-sm text-slate-400"><RefreshCw className="animate-spin" size={17}/>Synchronising atmospheric signals… The deployed model may be waking up.</div>;
  const c=data.current;
  return <div className="mx-auto max-w-[1500px] space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Live atmospheric snapshot</p><h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Good evening, analyst.</h2><p className="mt-1 text-sm text-slate-400">Here’s what the air is telling us right now.</p></div><label className="flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white/60 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"><MapPin size={16}/><select className="bg-transparent font-semibold outline-none" value={city} onChange={e=>setCity(e.target.value)}>{["Nagpur","Pune","Mumbai","Delhi","Bengaluru","Hyderabad"].map(x=><option key={x}>{x}</option>)}</select><RefreshCw size={14} className="text-slate-400"/></label></div>
    <div className="grid gap-5 xl:grid-cols-[1fr_1.7fr]"><AQICard aqi={c.AQI} category={data.meta.category} city={city} main={data.main_pollutant}/><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{[["PM2.5",c["PM2.5"],"µg/m³","#ef4444"],["PM10",c.PM10,"µg/m³","#f97316"],["NO₂",c.NO2,"µg/m³","#eab308"],["SO₂",c.SO2,"µg/m³","#06b6d4"],["CO",c.CO,"mg/m³","#8b5cf6"],["O₃",c.O3,"µg/m³","#10b981"]].map(([l,v,u,t])=><PollutantCard key={l as string} label={l as string} value={v as number} unit={u as string} tone={t as string}/>)}</div></div>
    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <ChartCard title="AQI movement" subtitle="Observed index across the latest monitoring window" action={<span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">14 day signal</span>}><ResponsiveContainer width="100%" height={285}><AreaChart data={data.trend}><defs><linearGradient id="aqiFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#10b981" stopOpacity=".35"/><stop offset="1" stopColor="#10b981" stopOpacity="0"/></linearGradient></defs><CartesianGrid vertical={false} stroke="rgba(100,116,139,.12)"/><XAxis dataKey="date" tickFormatter={shortDate} tick={{fontSize:11}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11}} axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="aqi" stroke="#10b981" strokeWidth={3} fill="url(#aqiFill)"/></AreaChart></ResponsiveContainer></ChartCard>
      <ChartCard title="City pressure index" subtitle="Latest comparable city AQI"><ResponsiveContainer width="100%" height={285}><BarChart data={data.comparison} layout="vertical"><CartesianGrid horizontal={false} stroke="rgba(100,116,139,.1)"/><XAxis type="number" hide/><YAxis dataKey="city" type="category" axisLine={false} tickLine={false} width={72} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="aqi" radius={[0,7,7,0]}>{data.comparison.map(item=><Cell key={item.city} fill={aqiColor(item.aqi)}/>)}</Bar></BarChart></ResponsiveContainer></ChartCard>
    </div>
    <div className="grid gap-4 md:grid-cols-3">{[[ThermometerSun,"Temperature",`${c.temperature}°C`,"Ambient"],[Droplets,"Humidity",`${c.humidity}%`,"Retention risk"],[Wind,"Wind speed",`${c.wind_speed} m/s`,"Dispersion"]].map(([Icon,label,value,note])=><div key={label as string} className="panel flex items-center gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-mint"><Icon/></span><div><p className="text-xs text-slate-400">{label as string}</p><b className="text-xl">{value as string}</b><small className="ml-2 text-slate-400">{note as string}</small></div></div>)}</div>
  </div>;
}
