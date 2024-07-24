
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Css/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOn, setIsOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickAvatar = () => {
    setIsOn(!isOn);
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header>
        <nav className="navigation">
          <div className="left">
            <div className="logo">
              <img src="https://i.imgur.com/7CPnvVn.png" alt="Logo" />
            </div>
          </div>
          <div className="center">
            <Link to="/" className="navigation-item">Home</Link>
            <Link to="/course" className="navigation-item">Courses</Link>
            <Link to="/#testimonial" className="navigation-item">Testimonial</Link>
            <Link to="/#mentor" className="navigation-item">Mentor</Link>
          </div>
          <button className="menu-button" onClick={handleMenuToggle}>
            {isMenuOpen ? '×' : '☰'}
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu">
              <Link to="/" className="navigation-item">Home</Link>
              <button className="close-button" onClick={handleMenuToggle}>×</button>
              <Link to="/course" className="navigation-item">Courses</Link>
              <Link to="/#testimonial" className="navigation-item">Testimonial</Link>
              <Link to="/#mentor" className="navigation-item">Mentor</Link>
              <hr />
              {isLoggedIn?.data ? (
                <>
                  <Link to="/user/editprofile" className="navigation-item">Edit profile</Link>
                  <Link to="/user/mycourse" className="navigation-item">Your course</Link>
                  <Link to="#" className="navigation-item" onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="navigation-item">Sign In</Link>
                  <Link to="/register" className="navigation-item">Sign Up</Link>
                </>
              )}
            </div>
          )}
          <div className="right">
            {isLoggedIn?.data ? (
              <div className="account-container">
                <img
                  src={isLoggedIn.data.imageAccount}
                  className="imageAccount"
                  alt="Account"
                  onClick={handleClickAvatar}
                />
                {isOn && (
                  <div className="account-setting">
                    <div className="info-account">
                      <img src={isLoggedIn.data.imageAccount} alt="Account" />
                      <div className="content">
                        <p className="fullname">{isLoggedIn.data.fullName}</p>
                        <div className="username">{isLoggedIn.data.userName}</div>
                      </div>
                    </div>
                    <hr className="line-account" />
                    <ul>
                      <li className="li-account">
                        <Link to="/user/editprofile">Edit profile</Link>
                      </li>
                      <li className="li-account">
                        <Link to="/user/mycourse">Your course</Link>
                      </li>
                      <li className="li-account">
                        <Link to="#" className="button-logout" onClick={handleLogout}>Logout</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
