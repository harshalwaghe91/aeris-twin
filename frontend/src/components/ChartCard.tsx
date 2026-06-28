import type { ReactNode } from "react";
export function ChartCard({ title, subtitle, action, children, className="" }: { title:string; subtitle?:string; action?:ReactNode; children:ReactNode; className?:string }) {
  return <section className={`panel ${className}`}><div className="mb-5 flex items-start justify-between"><div><h3 className="font-display font-bold">{title}</h3>{subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}</div>{action}</div>{children}</section>;
}
