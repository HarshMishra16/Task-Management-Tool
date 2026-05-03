import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try { await register(form.name, form.email, form.password); nav("/"); }
    catch (e) { setErr(e.response?.data?.message || "Registration failed"); }
  };

  return (
    <div className="auth-page">
      <form onSubmit={submit} className="auth-card">
        <h2>Create Account</h2>
        {err && <div className="alert">{err}</div>}
        <input placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password (min 6)" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
        <button className="btn btn-primary" type="submit">Sign Up</button>
        <p className="muted">Have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
