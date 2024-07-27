import React, { useEffect, useState } from "react";

const NavAdmin = ({ isLoggedIn }) => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const dateToday = new Date();
      const formattedDateTime =
        dateToday.getFullYear() +
        "-" +
        String(dateToday.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(dateToday.getDate()).padStart(2, "0") +
        " " +
        String(dateToday.getHours()).padStart(2, "0") +
        ":" +
        String(dateToday.getMinutes()).padStart(2, "0") +
        ":" +
        String(dateToday.getSeconds()).padStart(2, "0");
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime(); // Cập nhật lần đầu tiên
    const intervalId = setInterval(updateDateTime, 1000); // Cập nhật mỗi giây

    return () => clearInterval(intervalId); // Xoá interval khi component bị huỷ
  }, []);
  return (
    <header className="app-header">
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ marginTop: "12px" }}>
        <div
          className="navbar-collapse d-flex justify-content-between px-0"
          id="navbarNav">
          <div>
            <h4 style={{ color: "#495057" }}>
              <b>Today: </b>
              {currentDateTime}
            </h4>
          </div>

          <div className="d-flex align-items-center">
            <h4
              style={{
                marginTop: "10px",
                color: "#495057",
                marginRight: "15px",
              }}>
              Hello, {isLoggedIn.data.fullName}
            </h4>
            <img
              src={isLoggedIn.data.imageAccount}
              alt=""
              width="45"
              height="45"
              style={{ objectFit: "cover" }}
              className="rounded-circle"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavAdmin;
