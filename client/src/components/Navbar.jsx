import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">BlogApp</Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin/dashboard">Admin</NavLink>
        )}

        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <button onClick={logoutUser}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
