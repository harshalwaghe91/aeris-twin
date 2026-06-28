import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return <button aria-label="Toggle theme" className="rounded-xl border border-black/5 bg-white/60 p-2.5 dark:border-white/10 dark:bg-white/5" onClick={() => setDark(value => !value)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>;
}
