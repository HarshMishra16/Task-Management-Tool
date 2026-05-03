import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try { await login(form.email, form.password); nav("/"); }
    catch (e) { setErr(e.response?.data?.message || "Login failed"); }
  };

  return (
    <div className="auth-page">
      <form onSubmit={submit} className="auth-card">
        <h2>Welcome Back</h2>
        {err && <div className="alert">{err}</div>}
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-primary" type="submit">Login</button>
        <p className="muted">No account? <Link to="/register">Sign up</Link></p>
      </form>
    </div>
  );
}
