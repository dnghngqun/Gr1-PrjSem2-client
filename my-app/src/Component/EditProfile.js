import React from "react";

import axios from "axios";
import { format, parse, parseISO } from "date-fns";
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

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(isLoggedIn.data.imageAccount);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/accounts/${isLoggedIn.data.id}/uploadAvatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setMessage("Upload avatar successfully!");
      setImageUrl(response.data.data.imageAccount);
    } catch (error) {
      setMessage("Failed to upload avatar.");
    }
  };
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

  const handleSubmit = () => {
    const dateString = `${year}-${month}-${day}`;
    const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    const updateAccount = {
      email: email,
      phoneNumber: phoneNumber,
      fullName: fullname,
      birthday: formattedDate,
    };
    const userId = isLoggedIn.data.id;
    axios
      .put(
        `http://localhost:8080/api/v1/accounts/updateInformation/${userId}`,
        updateAccount,
        { withCredentials: true }
      )
      .then((response) => console.log("update success"))
      .catch((error) => console.log("Error to update info: ", error));
  };
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="edit-profile">
        <div className="avatar-profile">
          <img src={imageUrl} className="img-avt" alt="" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload Avatar</button>
        <p>{message}</p>
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
