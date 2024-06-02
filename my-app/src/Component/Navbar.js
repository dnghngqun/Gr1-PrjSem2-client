import React from "react";
import "./Css/Navbar.css";
const Navbar = () => {
  return (
    <div>
      <header>
        <nav className="navigation">
          <div className="left">
            <div className="logo">
              Lo<span style={{ color: "#397A71" }}>go</span>
            </div>
          </div>
          <div className="center">
            <a href="/" className="navigation-item">Home</a>
            <a href="#" className="navigation-item">Courses</a>
            <a href="#" className="navigation-item">Testimonial</a>
            <a href="#" className="navigation-item">Mentor</a>
          </div>
          <div className="right">
            <a href="#" className="sign-in">Sign In</a>
            <a href="" className="sign-up">Sign Up</a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
