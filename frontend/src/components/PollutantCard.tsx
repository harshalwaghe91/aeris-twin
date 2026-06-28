import { Wind } from "lucide-react";

export function PollutantCard({ label, value, unit, tone = "#10b981" }: { label: string; value: number; unit: string; tone?: string }) {
  const max = label === "CO" ? 4 : label === "PM10" ? 250 : 150;
  return <div className="glass rounded-2xl p-4"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold">{value}<small className="ml-1 text-[10px] font-medium text-slate-400">{unit}</small></p></div><span className="rounded-xl p-2" style={{color:tone,background:`${tone}15`}}><Wind size={16}/></span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full" style={{width:`${Math.min(100,value/max*100)}%`,background:tone}}/></div></div>;
}
