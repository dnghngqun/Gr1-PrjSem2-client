import React from "react";

import axios from "axios";
import { format, parse, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import "./Css/EditProfile.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ForgotPassword from './ForgotPassword';
const EditProfile = ({ isLoggedIn, onLogout, triggerRefresh }) => {
  const [fullname, setFullname] = useState(isLoggedIn.data.fullName);
  const [phoneNumber, setPhoneNumber] = useState(isLoggedIn.data.phoneNumber);
  const [email, setEmail] = useState(isLoggedIn.data.email);
  const birthday = isLoggedIn.data.birthday;
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("Hello");
  const [imageUrl, setImageUrl] = useState(isLoggedIn.data.imageAccount);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const notify = (mess) =>
    toast({
      text: mess,
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      close: true,
      onClick: function () {}, // Callback after click
    }).showToast();

  const notifyFail = (err) =>
    toast({
      text: err,
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #c50e0e, #ec6554)",
      },
      close: true,
      onClick: function () {}, // Callback after click
    }).showToast();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const formData = new FormData();
    formData.append("image", file);

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
      notify("Upload avatar successfully!");
      setImageUrl(response.data.data.imageAccount);
      triggerRefresh();
    } catch (error) {
      notifyFail("Failed to upload avatar.");
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
    if (value >= 1 && value <= 2099) {
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
      .then((response) => notify("Update information successfully!"))
      .catch((error) => {
        console.error("Error to update info: ", error);
        notifyFail("Error to update information!");
      });
  };
  const handleSubmitPassword = () => {
    const changePass = {
      identify: isLoggedIn.data.userName,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    console.log(changePass);
    axios
      .put("http://localhost:8080/api/v1/accounts/changePassword", null, {
        params: changePass,
      })
      .then((res) => notify("Change password successfully!"))
      .catch((err) => {
        console.log("Error to change pass: ", err);
        notifyFail("Old password is incorrect!");
      });
  };

  return (
    <div>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <div className="edit-profile">
          <div className="avatar-profile">
            <div className="avt-container">
              <img src={imageUrl} className="img-avt" alt="" />
              <div className="upload-btn">
                <label htmlFor="upload-button" className="upload-icon">
                  <img src="/assets/svg/camera-solid.svg" alt="" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="upload-button"
                />
              </div>
            </div>
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
        <div className="edit-profile">
          <div className="avatar-profile">
            <div className="avt-container">
              <img src={imageUrl} className="img-avt" alt="" />
              <div className="upload-btn">
                <label htmlFor="upload-button" className="upload-icon">
                  <img src="/assets/svg/camera-solid.svg" alt="" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="upload-button"
                />
              </div>
            </div>
          </div>
          <form className="form-edit">
            <h1>
              <trong>Change Password</trong>
            </h1>
            <form>
              <div>
                <label>Old Password:</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <a onClick={handleSubmit} className="btn-edit">
             Change Password
            </a>
            </form>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;
