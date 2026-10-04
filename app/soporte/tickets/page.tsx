import { getTickets } from "@/lib/store";
import { TicketTable } from "@/components/ui";
export const dynamic = "force-dynamic";
export default async function Tickets() {
  const rows = await getTickets();
  return <><div className="page-head"><div><h1>Tickets</h1><p>Todas las solicitudes registradas.</p></div></div>
    <div className="card"><TicketTable rows={rows} /></div></>;
}
