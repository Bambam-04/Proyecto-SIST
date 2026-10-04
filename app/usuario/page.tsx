import Link from "next/link";
import { getTickets } from "@/lib/store";
import { Badge, Empty, Stat } from "@/components/ui";
export const dynamic = "force-dynamic";
export default async function Inicio() {
  const all = await getTickets();
  const n = (e: string) => all.filter(t => t.estado === e).length;
  return <>
    <div className="page-head"><div><h1>Hola, Abraham</h1><p>Resumen de tus solicitudes.</p></div>
      <Link className="btn btn-primary" href="/usuario/nuevo">Crear ticket</Link></div>
    <div className="grid g3" style={{ marginBottom: 24 }}>
      <Stat n={n("Abierto")} label="Abiertos" /><Stat n={n("En proceso")} label="En proceso" /><Stat n={n("Resuelto")} label="Resueltos" /></div>
    <div className="card"><h3 style={{ marginBottom: 12 }}>Actividad reciente</h3>
      {all.length === 0 && <Empty title="Aún no tienes tickets" hint="Crea tu primer ticket para empezar." />}
      {all.slice(0, 5).map(t => <div key={t.id} style={{ padding: "12px 0", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
        <div><span className="caption">{t.id} · {t.ubicacion}</span><p className="label">{t.titulo}</p></div><Badge v={t.estado} /></div>)}
    </div>
  </>;
}
