import React from "react";
import "./Css/Navbar.css";
const Navbar = () => {
  return (
    <div>
      <header>
        <nav className="navigation">
          <div className="left">
            <h1 className="logo">
              Lo<span style={{ color: "#397A71" }}>go</span>
            </h1>
          </div>
          <div className="center">
            <a href="/" className="navigation-item">
              Home
            </a>
            <a href="#" className="navigation-item">
              Courses
            </a>
            <a href="#" className="navigation-item">
              Testimonial
            </a>
            <a href="#" className="navigation-item">
              Mentor
            </a>
          </div>
          <div className="right">
            <button className="btn-sign sign-in">
              <span>Sign In</span>
            </button>
            <button className="btn-sign sign-up">
              <span>Sign Up</span>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
