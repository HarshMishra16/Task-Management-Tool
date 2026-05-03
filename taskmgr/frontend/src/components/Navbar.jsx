import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">📋 TaskFlow</Link>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={() => { logout(); nav("/login"); }} className="btn btn-ghost">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
