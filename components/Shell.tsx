"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { roles } from "@/lib/data";
export default function Shell({ role, children }: { role: keyof typeof roles; children: React.ReactNode }) {
  const path = usePathname(); const items = roles[role];
  const cur = (h: string) => (path === h ? "page" : undefined);
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">SISTA FCQI<small>UABC</small></div>
        <nav className="nav" aria-label="Principal">
          {items.map(([t, h]) => <Link key={h} href={h} aria-current={cur(h)}><span className="txt">{t}</span></Link>)}
        </nav>
      </aside>
      <div>
        <header className="topbar"><strong>Soporte Técnico FCQI</strong><span className="caption">usuario@uabc.edu.mx</span></header>
        <main className="content">{children}</main>
      </div>
      <nav className="bottom-nav" aria-label="Móvil">
        {items.map(([t, h]) => <Link key={h} href={h} aria-current={cur(h)}>{t}</Link>)}
      </nav>
    </div>
  );
}
