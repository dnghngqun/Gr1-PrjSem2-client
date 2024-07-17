import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Css/Navbar.css";
const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOn, setIsOn] = useState(false);
  const handleClickAvatar = () => {
    setIsOn(!isOn);
  };
  console.log(isLoggedIn);
  const handleLogout = () => {
    onLogout(); // Gọi hàm logout khi nhấn nút Logout
  };
  return (
    <div>
      <header>
        <nav className="navigation">
          <div className="left">
            <div className="logo">
              <img src="https://i.imgur.com/7CPnvVn.png" alt="" />
            </div>
          </div>
          <div className="center">
            <Link to="/" className="navigation-item">
              Home
            </Link>
            <Link to="/course" className="navigation-item">
              Courses
            </Link>
            <Link to="#" className="navigation-item">
              Testimonial
            </Link>
            <Link to="#" className="navigation-item">
              Mentor
            </Link>
          </div>
          <div className="right">
            {isLoggedIn?.data ? (
              <>
                <div className="account-container">
                  <img
                    src={isLoggedIn.data.imageAccount}
                    className="imageAccount"
                    alt=""
                    onClick={handleClickAvatar}
                  />
                  {isOn ? (
                    <>
                      <div className="account-setting">
                        <div className="info-account">
                          <img src={isLoggedIn.data.imageAccount} alt="" />
                          <div className="content">
                            <p className="fullname">
                              {isLoggedIn.data.fullName}
                            </p>
                            <div className="username">
                              {isLoggedIn.data.userName}
                            </div>
                          </div>
                        </div>
                        <hr className="line-account" />
                        <ul>
                          <li className="li-account">
                            <Link to="#">Edit profile</Link>
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
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              /* <React.Fragment>  react > 16 viết tắt thành <>
                tạo wrapper cho nhóm phần tử khi trả về nhiều phần tử con từ 1 component
             */
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
