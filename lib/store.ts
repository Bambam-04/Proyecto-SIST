import { promises as fs } from "fs";
import path from "path";
import type { Ticket } from "./data";

// Los tickets se guardan en data/tickets.json (se crea solo la primera vez).
const FILE = path.join(process.cwd(), "data", "tickets.json");

const seed: Ticket[] = [
  { id: "TK-1042", titulo: "Proyector sin señal", categoria: "Equipo audiovisual", ubicacion: "Edificio 6A · Lab 501", prioridad: "Alta", estado: "En proceso", fecha: "2 oct" },
  { id: "TK-1041", titulo: "Equipo no enciende", categoria: "Hardware", ubicacion: "Edificio 6B · Aula 204", prioridad: "Media", estado: "Abierto", fecha: "1 oct" },
  { id: "TK-1037", titulo: "Instalación de software", categoria: "Software", ubicacion: "Edificio 6C · Lab 3", prioridad: "Baja", estado: "Resuelto", fecha: "29 sep" },
];

async function write(t: Ticket[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(t, null, 2), "utf8");
}
export async function getTickets(): Promise<Ticket[]> {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")) as Ticket[]; }
  catch { await write(seed); return seed; }
}
export async function addTicket(d: Pick<Ticket, "titulo" | "categoria" | "ubicacion">): Promise<Ticket> {
  const all = await getTickets();
  const next = Math.max(1000, ...all.map(t => Number(t.id.replace("TK-", "")) || 0)) + 1;
  const fecha = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short" }).replace(".", "");
  const t: Ticket = { id: `TK-${next}`, ...d, prioridad: "Media", estado: "Abierto", fecha };
  await write([t, ...all]);
  return t;
}
