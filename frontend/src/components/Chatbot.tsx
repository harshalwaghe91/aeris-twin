import { Bot, CornerDownLeft, LoaderCircle, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { endpoints } from "../api/api";

type Message = { role:"assistant"|"user"; text:string };
const prompts = ["Is it safe to go outside?","Why is PM2.5 dangerous?","How can pollution be reduced?","What should asthma patients do?"];
export function Chatbot({ compact=false }: {compact?:boolean}) {
  const [messages,setMessages] = useState<Message[]>([{role:"assistant",text:"Hello — I’m Aeris. Ask me about AQI, exposure, pollutants, forecasts, or health precautions."}]);
  const [text,setText] = useState(""); const [busy,setBusy] = useState(false);
  const send = async (value=text) => { if(!value.trim()||busy)return; setMessages(m=>[...m,{role:"user",text:value}]);setText("");setBusy(true);try{const r=await endpoints.chatbot(value,171);setMessages(m=>[...m,{role:"assistant",text:r.answer}])}catch{setMessages(m=>[...m,{role:"assistant",text:"I couldn’t reach the intelligence service. Please try again."}])}finally{setBusy(false)} };
  return <div className={`flex flex-col overflow-hidden ${compact?"h-[500px]":"h-[650px]"} panel !p-0`}>
    <div className="flex items-center gap-3 border-b border-emerald-950/10 p-5 dark:border-white/10"><span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-mint dark:bg-mint dark:text-ink"><Bot size={20}/></span><div><b className="font-display">Aeris assistant</b><p className="flex items-center gap-1 text-[11px] text-emerald-600"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>Offline intelligence ready</p></div></div>
    <div className="flex-1 space-y-4 overflow-y-auto p-5">{messages.map((message,index)=><div key={index} className={`flex gap-2 ${message.role==="user"?"justify-end":""}`}>{message.role==="assistant"&&<span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10"><Sparkles size={14}/></span>}<p className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role==="user"?"bg-ink text-white dark:bg-mint dark:text-ink":"bg-slate-100 dark:bg-white/[.06]"}`}>{message.text}</p>{message.role==="user"&&<span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-200 dark:bg-white/10"><User size={14}/></span>}</div>)}{busy&&<LoaderCircle className="animate-spin text-emerald-500" size={18}/>}</div>
    <div className="flex gap-2 overflow-x-auto px-5 pb-3">{prompts.map(prompt=><button key={prompt} onClick={()=>send(prompt)} className="shrink-0 rounded-full border border-emerald-950/10 px-3 py-1.5 text-[11px] dark:border-white/10">{prompt}</button>)}</div>
    <div className="flex gap-2 border-t border-emerald-950/10 p-4 dark:border-white/10"><input className="input" placeholder="Ask about today’s air…" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/><button aria-label="Send" className="btn-primary !px-3" onClick={()=>send()}><CornerDownLeft size={17}/></button></div>
  </div>;
}
