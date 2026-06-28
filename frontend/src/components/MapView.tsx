import L from "leaflet";
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip } from "react-leaflet";
import { aqiColor } from "../utils/aqiUtils";

export type Hotspot = { city:string;lat:number;lng:number;aqi:number;category:string;main_pollutant:string;advice:string;pollutants:Record<string,number> };
export function MapView({ hotspots }: { hotspots: Hotspot[] }) {
  return <div className="relative h-[560px] overflow-hidden rounded-[1.5rem] border border-white/70 dark:border-white/10">
    <MapContainer center={[22.6,78.7]} zoom={5} scrollWheelZoom className="h-full w-full">
      <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {hotspots.map(item => <CircleMarker key={item.city} center={[item.lat,item.lng]} radius={11+item.aqi/60} pathOptions={{color:"#fff",weight:3,fillColor:aqiColor(item.aqi),fillOpacity:.95}}>
        <Tooltip direction="top" offset={L.point(0,-8)}>{item.city} · AQI {Math.round(item.aqi)}</Tooltip>
        <Popup><div className="min-w-56"><p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-700">{item.category}</p><h3 className="m-0 text-lg font-bold">{item.city} · {Math.round(item.aqi)}</h3><p className="text-xs text-slate-500">Main pollutant: {item.main_pollutant}</p><div className="my-3 grid grid-cols-3 gap-1">{Object.entries(item.pollutants).slice(0,6).map(([k,v])=><span className="rounded bg-slate-100 p-1 text-center text-[10px]" key={k}><b>{k}</b><br/>{v}</span>)}</div><p className="m-0 text-xs leading-5">{item.advice}</p></div></Popup>
      </CircleMarker>)}
    </MapContainer>
    <div className="absolute bottom-5 left-5 z-[500] rounded-xl bg-white/90 p-3 text-xs shadow-xl backdrop-blur"><b className="mb-2 block">AQI legend</b><div className="flex gap-2">{[["Good","#22c55e"],["Moderate","#eab308"],["Poor","#f97316"],["Very poor","#ef4444"],["Severe","#9333ea"]].map(([name,color])=><span key={name} className="flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{background:color}}/>{name}</span>)}</div></div>
  </div>;
}
