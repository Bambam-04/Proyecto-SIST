"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categorias, edificios } from "@/lib/data";

type V = { titulo: string; categoria: string; edificio: string; aula: string };

export default function Nuevo() {
  const router = useRouter();
  const [v, setV] = useState<V>({ titulo: "", categoria: "", edificio: "", aula: "" });
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fail, setFail] = useState("");
  const err = (k: keyof V) => (sent && !v[k].trim() ? "Revisa este campo antes de continuar." : "");
  const set = (k: keyof V) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV({ ...v, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true); setFail("");
    if (!Object.values(v).every(x => x.trim())) return;
    setSaving(true);
    try {
      const r = await fetch("/api/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      if (!r.ok) throw new Error();
      router.push("/usuario/tickets");
      router.refresh();
    } catch {
      setFail("No se pudo guardar el ticket. Intenta de nuevo.");
      setSaving(false);
    }
  }

  const wrap = (k: keyof V, label: string, el: React.ReactNode) => (
    <div className={`field ${err(k) ? "error" : ""}`}>
      <label className="label">{label}</label>{el}
      {err(k) && <span className="msg" role="alert">{err(k)}</span>}
    </div>
  );

  return <>
    <div className="page-head"><div><h1>Reportar una falla</h1><p>Completa los datos del problema.</p></div></div>
    <form className="card" style={{ maxWidth: 640 }} onSubmit={submit} noValidate>
      {wrap("titulo", "Título", <input value={v.titulo} onChange={set("titulo")} placeholder="Proyector sin señal" />)}
      {wrap("categoria", "Categoría", <select value={v.categoria} onChange={set("categoria")}>
        <option value="">Selecciona una opción</option>{categorias.map(c => <option key={c}>{c}</option>)}</select>)}
      {wrap("edificio", "Edificio", <select value={v.edificio} onChange={set("edificio")}>
        <option value="">Selecciona un edificio</option>{edificios.map(b => <option key={b} value={b}>Edificio {b}</option>)}</select>)}
      {wrap("aula", "Aula o laboratorio", <input value={v.aula} onChange={set("aula")} placeholder="Aula 204 / Lab 3" />)}
      {fail && <p className="msg" role="alert" style={{ color: "var(--danger)", marginBottom: 16 }}>{fail}</p>}
      <button className="btn btn-primary" disabled={saving}>{saving ? "Guardando cambios…" : "Registrar ticket"}</button>
    </form>
  </>;
}
