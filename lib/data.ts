export type Prioridad = "Alta" | "Media" | "Baja";
export type Estado = "En proceso" | "Abierto" | "Resuelto";
export interface Ticket { id: string; titulo: string; categoria: string; ubicacion: string; prioridad: Prioridad; estado: Estado; fecha: string }
export const categorias = ["Hardware", "Software", "Red", "Equipo audiovisual"];
export const edificios = "ABCDEFGHIJK".split("").map(l => `6${l}`);
export const roles = {
  usuario: [["Inicio", "/usuario"], ["Nuevo ticket", "/usuario/nuevo"], ["Mis tickets", "/usuario/tickets"]],
  soporte: [["Inicio", "/soporte"], ["Tickets", "/soporte/tickets"]],
  admin: [["Inicio", "/admin"], ["Tickets", "/soporte/tickets"]],
} as const;
