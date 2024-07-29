import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Css/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOn, setIsOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleClickAvatar = () => {
    setIsOn(!isOn);
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSectionId = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop - 50 &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSectionId = section.getAttribute("id");
        }
      });

      setActiveId(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // To set the initial state based on the current scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <header>
        <nav className="navigation">
          <div className="left">
            <Link to="/">
              <div className="logo">
                <img src="https://i.imgur.com/7CPnvVn.png" alt="Logo" />
              </div>
            </Link>
          </div>
          <div className="center">
            <Link
              to="/"
              className={`navigation-item ${
                location.pathname === "/" ? "active" : ""
              }`}>
              Home
            </Link>
            <Link
              to="/course"
              className={`navigation-item ${
                location.pathname.startsWith("/course") ? "active" : ""
              }`}>
              Courses
            </Link>
            <Link
              to="/#testimonial"
              className={`navigation-item ${
                activeId === "testimonial" ? "active" : ""
              }`}>
              Testimonial
            </Link>
            <Link
              to="/#mentor"
              className={`navigation-item ${
                activeId === "mentor" ? "active" : ""
              }`}>
              Mentor
            </Link>
          </div>
          <button className="menu-button" onClick={handleMenuToggle}>
            {isMenuOpen ? "×" : "☰"}
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu">
              <Link to="/" className="navigation-item">
                Home
              </Link>
              <Link to="/course" className="navigation-item">
                Courses
              </Link>
              <Link to="/#testimonial" className="navigation-item">
                Testimonial
              </Link>
              <Link to="/#mentor" className="navigation-item">
                Mentor
              </Link>
              <hr />
              {isLoggedIn?.data ? (
                <>
                  <Link to="/user/editprofile" className="navigation-item">
                    Edit profile
                  </Link>
                  <Link to="/user/mycourse" className="navigation-item">
                    Your course
                  </Link>
                  <Link
                    to="#"
                    className="navigation-item"
                    onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="navigation-item">
                    Sign In
                  </Link>
                  <Link to="/register" className="navigation-item">
                    Sign Up
                  </Link>
                </>
              )}
              <button className="close-button" onClick={handleMenuToggle}>
                ×
              </button>
            </div>
          )}
          <div className="right">
            {isLoggedIn?.data ? (
              <>
                {isLoggedIn.data.role === "instructor" && (
                  <button
                    className="btn btn-instructor-admin"
                    onClick={() => {
                      navigate("/instructor");
                    }}>
                    Return Instructor
                  </button>
                )}
                {isLoggedIn.data.role === "admin" && (
                  <button
                    className="btn btn-instructor-admin"
                    onClick={() => {
                      navigate("/admin");
                    }}>
                    Return Admin
                  </button>
                )}
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
                          <div className="username">
                            {isLoggedIn.data.userName}
                          </div>
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
                          <Link
                            to="#"
                            className="button-logout"
                            onClick={handleLogout}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn-sign sign-in">
                    <span>Sign In</span>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn-sign sign-up">
                    <span>Sign Up</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
