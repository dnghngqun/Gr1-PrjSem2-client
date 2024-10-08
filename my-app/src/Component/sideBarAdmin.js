import React from "react";
import { Link } from "react-router-dom";
const sideBarAdmin = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout(); // Gọi hàm logout khi nhấn nút Logout
  };
  return (
    <aside className="left-sidebar" style={{ width: "240px" }}>
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link to="/" className="text-nowrap logo-img">
            <img
              src="https://i.imgur.com/8epSVJH.png"
              style={{ width: "140px", margin: "20px 0 0 30px" }}
              alt="Logo"
            />
          </Link>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"></div>
        </div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <span className="hide-menu">Home</span>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/admin" aria-expanded="false">
                <span></span>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="nav-small-cap">
              <span className="hide-menu">Account</span>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/account/student"
                aria-expanded="false">
                <span></span>
                <span className="hide-menu">Students</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/account/instructor"
                aria-expanded="false">
                <span></span>
                <span>Instructor</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/class"
                aria-expanded="false">
                <b className="" style={{ fontSize: "12px" }}>
                  CLASS
                </b>
              </Link>
            </li>
            <li className="sidebar-item ">
              <Link
                className="sidebar-link"
                to="/admin/instructor"
                aria-expanded="false">
                <b className="hide-menu" style={{ fontSize: "12px" }}>
                  INSTRUCTOR
                </b>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/admin/attendance"
                aria-expanded="false">
                <b className="" style={{ fontSize: "12px" }}>
                  VIEW ATTENDANCE
                </b>
              </Link>
            </li>
            <li className="nav-small-cap">
              <span className="hide-menu">AUTH</span>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/user/editprofile"
                aria-expanded="false">
                <span></span>
                <span className="hide-menu">Edit Profile</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="#"
                onClick={handleLogout}
                aria-expanded="false">
                <span></span>
                <span className="hide-menu">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default sideBarAdmin;
