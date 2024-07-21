import React from "react";

const NavStaff = ({ isLoggedIn }) => {
  return (
    <header className="app-header">
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ marginTop: "12px" }}>
        <div
          className="navbar-collapse justify-content-end px-0"
          id="navbarNav">
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <li className="nav-item dropdown">
              <img
                src={isLoggedIn.data.imageAccount}
                alt=""
                width="45"
                height="45"
                className="rounded-circle"
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavStaff;
