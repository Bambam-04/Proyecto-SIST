import { getTickets } from "@/lib/store";
import { TicketTable } from "@/components/ui";
export const dynamic = "force-dynamic";
export default async function Mis() {
  const rows = await getTickets();
  return <><div className="page-head"><div><h1>Mis tickets</h1><p>Consulta el estado de tus solicitudes.</p></div></div>
    <div className="card"><TicketTable rows={rows} /></div></>;
}
