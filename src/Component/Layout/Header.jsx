import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="bg-light">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hdr_rgt">
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
