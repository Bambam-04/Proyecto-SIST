import { Stat } from "@/components/ui";
export default function Admin() {
  return <><div className="page-head"><div><h1>Administración</h1><p>Vista general del sistema.</p></div></div>
    <div className="grid g3"><Stat n={26} label="Miembros" /><Stat n={6} label="Categorías" /><Stat n={143} label="Tickets del mes" /></div></>;
}
