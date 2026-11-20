import type { ReactNode } from "react";
import logo from "../assets/portal-logo.svg";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-2 border-b border-slate-800 px-4 py-2">
        <img src={logo} alt="" className="h-4 w-4" />
        <span className="text-sm font-medium">Portal</span>
      </header>
      <main className="flex flex-1 items-center justify-center overflow-auto p-6">
        {children}
      </main>
      <footer className="flex items-center justify-center gap-2 border-t border-slate-800 px-4 py-2 text-xs text-slate-500">
        <img src={logo} alt="" className="h-3.5 w-3.5" />
        <span>Portal ICT</span>
      </footer>
    </div>
  );
}
