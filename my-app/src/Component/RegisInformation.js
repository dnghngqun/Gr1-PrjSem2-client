import React, { useEffect, useState } from "react";
import "./Css/RegisInformation.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const RegisInformation = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    validateDate();
  }, [day, month, year]);

  const validateDate = () => {
    let daysInMonth = 31;

    if (month === "2") {
      // Kiểm tra năm nhuận
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth = 29;
      } else {
        daysInMonth = 28;
      }
    } else if (["4", "6", "9", "11"].includes(month)) {
      daysInMonth = 30;
    }

    if (day > daysInMonth) {
      setDay(daysInMonth);
    }
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <form className="form-container">
        <div className="left">
          <h1 className="title">Course Registration Information </h1>
          <hr className="line line-left" />
          <label htmlFor="fullname" className="label">
            Fullname
          </label>
          <br />
          <input type="text" id="fullname" />
          <br />
          <label htmlFor="phoneNumber" className="label phoneNumber">
            PhoneNumber
          </label>
          <br />
          <input type="text" id="phoneNumber" /> <br />
          <label htmlFor="email" className="label email">
            Email
          </label>
          <br />
          <input type="text" id="email" />
          <br />
          <label htmlFor="" className="label">
            Birthday
          </label>
          <div className="birthday">
            <div className="div-day">
              <label htmlFor="day" className="day label">
                Day
              </label>
              <br />
              <input
                type="number"
                min="1"
                max="31"
                step="1"
                id="day"
                value={day}
                onChange={handleDayChange}
              />
            </div>
            <div className="div-month">
              <label htmlFor="month" className="month label">
                Month
              </label>
              <br />
              <input
                type="number"
                min="1"
                max="12"
                step="1"
                id="month"
                value={month}
                onChange={handleMonthChange}
              />
            </div>

            <div className="div-year">
              <label htmlFor="year" className="year label">
                Year
              </label>
              <br />
              <input
                type="number"
                min="1930"
                max="2099"
                step="1"
                id="year"
                value={year}
                onChange={handleYearChange}
              />
            </div>
          </div>
          <button className="button button-submit" type="submit">
            submit
          </button>
        </div>
        <div className="right">
          <div className="course-in4">
            <div className="left">
              <img src="assets/img/home-hero.webp" alt="" />
            </div>
            <div className="right">
              <h1 className="title">Toeic Basic</h1>
              <p className="content">bởi trung tâm anh ngữ...</p>
            </div>
          </div>
          <div className="in4-order">
            <p>
              <b>Instructor:</b> Mrs Ly
            </p>
            <p>
              <b>Instructor:</b> Mrs Ly
            </p>
            <p>
              <b>Instructor:</b> Mrs Ly
            </p>
          </div>
          <hr className="line" />
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default RegisInformation;
