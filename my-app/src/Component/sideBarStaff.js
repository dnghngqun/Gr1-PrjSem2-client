import React from "react";
import { Link } from "react-router-dom";
const sideBarStaff = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout(); // Gọi hàm logout khi nhấn nút Logout
  };
  return (
    <aside className="left-sidebar">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link to="/staff" className="text-nowrap logo-img">
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
              <Link className="sidebar-link" to="/staff" aria-expanded="false">
                <span></span>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="nav-small-cap">
              <span className="hide-menu">MANAGE</span>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/staff/student"
                aria-expanded="false">
                <span></span>
                <span className="hide-menu">Students</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/staff/class"
                aria-expanded="false">
                <span></span>
                <span className="hide-menu">Class</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/staff/instructor"
                aria-expanded="false">
                <span></span>
                <span className="hide-menu">Instructor</span>
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

export default sideBarStaff;
