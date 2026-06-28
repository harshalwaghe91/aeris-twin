import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function Layout() {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen"><Sidebar open={open} close={() => setOpen(false)}/>{open && <button aria-label="Close menu" className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)}/>}<div className="lg:pl-72"><Navbar openMenu={() => setOpen(true)}/><main className="grid-bg min-h-[calc(100vh-5rem)] p-4 lg:p-8"><Outlet/></main></div></div>;
}
