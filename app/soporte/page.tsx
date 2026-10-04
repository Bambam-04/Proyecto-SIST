import Link from "next/link";
import { getTickets } from "@/lib/store";
import { Badge, Stat } from "@/components/ui";
export const dynamic = "force-dynamic";
export default async function Panel() {
  const all = await getTickets();
  const pend = all.filter(t => t.estado !== "Resuelto");
  return <>
    <div className="page-head"><div><h1>Panel de soporte</h1><p>Tickets pendientes del día.</p></div></div>
    <div className="grid g3" style={{ marginBottom: 24 }}>
      <Stat n={all.filter(t => t.estado === "Abierto").length} label="Abiertos" />
      <Stat n={all.filter(t => t.estado === "En proceso").length} label="En proceso" />
      <Stat n={all.filter(t => t.prioridad === "Alta" && t.estado !== "Resuelto").length} label="Alta prioridad" /></div>
    <div className="card"><h3 style={{ marginBottom: 12 }}>Pendientes</h3>
      {pend.slice(0, 6).map(t => <div key={t.id} style={{ padding: "12px 0", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
        <div><span className="caption">{t.id} · {t.ubicacion}</span><p className="label">{t.titulo}</p></div><Badge v={t.prioridad} /></div>)}
      <Link className="btn btn-outline" href="/soporte/tickets" style={{ marginTop: 12 }}>Ver todos los tickets</Link></div>
  </>;
}
