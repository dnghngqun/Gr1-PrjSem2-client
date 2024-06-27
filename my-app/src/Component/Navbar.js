import React from "react";
import "./Css/Navbar.css";
const Navbar = ({ isLoggedIn, onLogout }) => {
  console.log(isLoggedIn);
  const handleLogout = () => {
    onLogout(); // Gọi hàm logout khi nhấn nút Logout
  };
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
            <a href="/course" className="navigation-item">
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
            {isLoggedIn?.data ? (
              <>
                <p>Hello, {isLoggedIn.data.userName}</p>
                <button className="btn-sign" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              /* <React.Fragment>  react > 16 viết tắt thành <>
                tạo wrapper cho nhóm phần tử khi trả về nhiều phần tử con từ 1 component
             */
              <>
                <a href="/login">
                  <button className="btn-sign sign-in">
                    <span>Sign In</span>
                  </button>
                </a>
                <a href="#">
                  <button className="btn-sign sign-up">
                    <span>Sign Up</span>
                  </button>
                </a>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
