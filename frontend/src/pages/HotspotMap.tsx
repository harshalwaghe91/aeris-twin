import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { endpoints } from "../api/api";
import { MapView, type Hotspot } from "../components/MapView";

export default function HotspotMap() {
  const [items,setItems]=useState<Hotspot[]>([]);useEffect(()=>{endpoints.hotspots().then(x=>setItems(x.hotspots))},[]);
  return <div className="mx-auto max-w-7xl space-y-5"><div><p className="eyebrow">Geospatial intelligence</p><h2 className="mt-2 font-display text-3xl font-bold">Pollution hotspot map</h2><p className="mt-2 text-sm text-slate-400">Compare exposure conditions and primary pollutants across monitored Indian cities.</p></div>{items.length?<MapView hotspots={items}/>:<div className="panel animate-pulse">Loading city telemetry…</div>}<div className="grid gap-3 md:grid-cols-3">{items.slice().sort((a,b)=>b.aqi-a.aqi).slice(0,3).map((x,i)=><div className="panel flex items-center gap-4" key={x.city}><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-mint"><MapPin/></span><div><p className="text-xs text-slate-400">#{i+1} hotspot</p><b>{x.city}</b><p className="text-xs text-slate-400">AQI {x.aqi} · {x.main_pollutant}</p></div></div>)}</div></div>;
}
