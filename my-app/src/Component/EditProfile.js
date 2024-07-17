import React from "react";

import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import "./Css/EditProfile.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
const EditProfile = ({ isLoggedIn, onLogout }) => {
  const [fullname, setFullname] = useState(isLoggedIn.data.fullName);
  const [phoneNumber, setPhoneNumber] = useState(isLoggedIn.data.phoneNumber);
  const [email, setEmail] = useState(isLoggedIn.data.email);
  const birthday = isLoggedIn.data.birthday;

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (birthday) {
      const parsedDate = parseISO(birthday);
      setDay(format(parsedDate, "dd"));
      setMonth(format(parsedDate, "MM"));
      setYear(format(parsedDate, "yyyy"));
    } else {
      setDay("");
      setMonth("");
      setYear("");
    }
  }, [birthday]);

  const handleDayChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= daysInMonth(month, year)) {
      setDay(value);
    } else {
      setDay("");
    }
  };
  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= 12) {
      setMonth(value);
      if (day > daysInMonth(value, year)) {
        setDay("");
      }
    } else {
      setMonth("");
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value >= 1930 && value <= 2099) {
      setYear(value);
      if (day > daysInMonth(month, value)) {
        setDay("");
      }
    } else {
      setYear("");
    }
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const handleSubmit = () => {};
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="edit-profile">
        <div className="avatar-profile">
          <img src={isLoggedIn.data.imageAccount} className="img-avt" alt="" />
        </div>
        <form className="form-edit">
          <label htmlFor="fullname" className="label-edit">
            Fullname:
          </label>
          <br />
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <br />
          <label htmlFor="email" className="label-edit">
            Email:
          </label>
          <br />
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="phoneNumber" className="label-edit">
            Phone Number:{" "}
          </label>
          <br />
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <label htmlFor="" className="label-edit">
            Birthday
          </label>
          <div className="date-birthday">
            <div className="date">
              <label htmlFor="day" className="day label-edit">
                Day:
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
            <div className="date">
              <label htmlFor="month" className="month label-edit">
                Month:
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
            <div className="date">
              <label htmlFor="month" className="year label-edit">
                Year:
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
          <a onClick={handleSubmit} className="btn-edit">
            Update information
          </a>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
