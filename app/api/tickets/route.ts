import { NextResponse } from "next/server";
import { addTicket, getTickets } from "@/lib/store";
import { categorias, edificios } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getTickets());
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const titulo = String(b?.titulo ?? "").trim();
  const categoria = String(b?.categoria ?? "");
  const edificio = String(b?.edificio ?? "");
  const aula = String(b?.aula ?? "").trim();
  if (!titulo || !aula || !categorias.includes(categoria) || !edificios.includes(edificio))
    return NextResponse.json({ error: "Revisa los campos marcados antes de continuar." }, { status: 400 });
  const t = await addTicket({ titulo, categoria, ubicacion: `Edificio ${edificio} · ${aula}` });
  return NextResponse.json(t, { status: 201 });
}
