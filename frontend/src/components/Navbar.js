// PRACTICAL 4: React Component - reusable UI piece with props/state
// PRACTICAL 5: useNavigate hook for programmatic navigation

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">StyleBook</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        {user && <Link to="/my-appointments">My Appointments</Link>}

        {user ? (
          <>
            <span className="welcome-text">Hi, {user.name}</span>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
