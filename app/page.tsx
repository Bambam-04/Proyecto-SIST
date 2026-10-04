import Link from "next/link";
export default function Login() {
  return (
    <div className="login"><div className="card">
      <h2>Soporte Técnico FCQI</h2>
      <p className="caption" style={{ margin: "4px 0 24px" }}>Accede con tu cuenta institucional UABC.</p>
      <div className="field"><label className="label" htmlFor="c">Correo institucional</label>
        <input id="c" type="email" placeholder="usuario@uabc.edu.mx" /></div>
      <Link className="btn btn-primary" href="/usuario" style={{ width: "100%" }}>Continuar con Google</Link>
    </div></div>
  );
}
