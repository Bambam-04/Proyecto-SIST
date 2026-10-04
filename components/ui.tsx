import { Ticket } from "@/lib/data";
const cls = { Alta: "alta", Media: "media", Baja: "baja", "En proceso": "proceso", Abierto: "media", Resuelto: "baja" } as const;
export const Badge = ({ v }: { v: keyof typeof cls }) => <span className={`badge b-${cls[v]}`}>{v}</span>;
export const Stat = ({ n, label }: { n: string | number; label: string }) =>
  <div className="card stat"><b>{n}</b><span className="caption">{label}</span></div>;
export const Empty = ({ title, hint }: { title: string; hint: string }) =>
  <div className="empty"><h3>{title}</h3><p>{hint}</p></div>;
export function TicketTable({ rows }: { rows: Ticket[] }) {
  if (!rows.length) return <Empty title="No encontramos resultados" hint="Prueba con otros filtros." />;
  return <>
    <div className="table-wrap"><table>
      <thead><tr><th>Folio</th><th>Título</th><th>Ubicación</th><th>Prioridad</th><th>Estado</th></tr></thead>
      <tbody>{rows.map(t => <tr key={t.id}><td>{t.id}</td><td>{t.titulo}</td><td>{t.ubicacion}</td><td><Badge v={t.prioridad} /></td><td><Badge v={t.estado} /></td></tr>)}</tbody>
    </table></div>
    <div className="cards-m">{rows.map(t => <div className="card" key={t.id}>
      <span className="caption">{t.id}</span><p className="label">{t.titulo}</p><Badge v={t.estado} /></div>)}</div>
  </>;
}
