import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Register.css";
const Register = ({ onLogin }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullname] = useState("");
  const [birthday, setBirthday] = useState("2000-01-01");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/accounts/currentUser",
          { withCredentials: true }
        );
        if (response.status === 200) {
          onLogin(response.data);
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking login status", error);
      }
    };
    checkLoginStatus();
  }, [navigate, onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(passwordAgain === password){

    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/accounts/register",
        {
          userName: userName,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          fullName: fullName,
          birthday: birthday,
        },
        { withCredentials: true }
      );
      console.log("data response: ", response.data);
      if (response.status === 200) {
        //regis success
        console.log("Register Success!");
        navigate("/login");
      } else {
        //login failed
        console.error("Register Failed");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }else{
    setError("confirm password don't match!")
    e.preventDefault();
  }
  };


  return (
    <div id="register">
      <div className="register-container">
        <div className="left">
          <img src="assets/img/images_login.jpg" alt="..." />
        </div>
        <div className="right">
          <h1 className="title">Register</h1>
          <form
            method="POST"
            className="register-by-form"
            onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="btn username"
              require
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="btn"
              require
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="btn phoneNumber"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="btn email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="btn password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="btn password"
              value={passwordAgain}
              placeholder="Confirm Password"
              onChange={(e) => setPasswordAgain(e.target.value)}
              required
            />

            <button type="submit" className=" btn btn-submit">
              <b>Sign up</b>
            </button>

            {/* <a href="#" className="forgot">
              Forgot <span>Username/Password?</span>
            </a> */}
          </form>
          <b className="text-line">or sign in with</b>
          <div className="register-other">
            <a href="#">
              <img
                src="assets/svg/google.svg"
                alt=""
                className="icon-register google-icon"
              />
            </a>
            <a href="#">
              <img
                src="assets/svg/Facebook.svg"
                alt=""
                className="icon-register facebook-icon"
              />
            </a>
            <a href="">
              <img
                src="assets/svg/SquareXTwitter.svg"
                alt=""
                className="icon-register twitter-icon"
              />
            </a>
          </div>
          <div className="create-account">
            Do you have an account?
            <a href="/login">
              Sign in <img src="assets/svg/RightLongSolid.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
