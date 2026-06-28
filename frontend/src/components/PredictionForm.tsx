import { LoaderCircle, Sparkles } from "lucide-react";
import type { AirInput } from "../types";

const fields: {key:keyof AirInput;label:string;step?:number}[] = [
  {key:"PM2.5",label:"PM2.5 (µg/m³)"},{key:"PM10",label:"PM10 (µg/m³)"},{key:"NO2",label:"NO₂ (µg/m³)"},{key:"SO2",label:"SO₂ (µg/m³)"},
  {key:"CO",label:"CO (mg/m³)",step:.1},{key:"O3",label:"O₃ (µg/m³)"},{key:"temperature",label:"Temperature (°C)"},{key:"humidity",label:"Humidity (%)"},{key:"wind_speed",label:"Wind speed (m/s)",step:.1}
];
export function PredictionForm({ value, onChange, onSubmit, busy=false, button="Run AI prediction" }: {value:AirInput;onChange:(v:AirInput)=>void;onSubmit:()=>void;busy?:boolean;button?:string}) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fields.map(field => <label key={field.key} className="text-xs font-semibold text-slate-500 dark:text-slate-300">{field.label}<input type="number" min="0" step={field.step || 1} className="input mt-2 text-sm text-current" value={value[field.key] as number} onChange={e => onChange({...value,[field.key]:Number(e.target.value)})}/></label>)}<label className="text-xs font-semibold text-slate-500 dark:text-slate-300">Monitoring city<select className="input mt-2 text-sm text-current" value={value.city} onChange={e=>onChange({...value,city:e.target.value})}>{["Nagpur","Pune","Mumbai","Delhi","Bengaluru","Hyderabad"].map(city=><option key={city}>{city}</option>)}</select></label><button onClick={onSubmit} disabled={busy} className="btn-primary self-end sm:col-span-2 lg:col-span-2">{busy?<LoaderCircle className="animate-spin" size={17}/>:<Sparkles size={17}/>} {button}</button></div>;
}
