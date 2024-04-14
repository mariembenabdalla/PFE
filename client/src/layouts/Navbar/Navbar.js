import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div className="wrapper">
        <nav className="nav">
          <div className="nav-logo">
            <p>LOGO .</p>
          </div>
          <div className="nav-menu" id="navMenu">
            <ul>
              <li>
                <a href="/home" className="link active">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Services
                </a>
              </li>
              <li>
                <a href="/About" className="link">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-button">
            <Link to="/Login">
              <button className="btn white-btn" id="loginBtn">
                Sign In
              </button>
            </Link>
            <Link to="/Signup">
              <button className="btn" id="registerBtn">
                Sign Up
              </button>
            </Link>
          </div>
          <div className="nav-menu-btn">
            <i className="bx bx-menu" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
