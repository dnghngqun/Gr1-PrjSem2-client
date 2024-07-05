import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Register.css";
const Register = ({ onLogin }) => {
  const navigate = useNavigate();
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

  return (
    <div id="register">
      <div className="register-container">
        <div className="left">
          <img src="assets/img/images_login.jpg" alt="..." />
        </div>
        <div className="right">
          <h1 className="title">Register</h1>
          <form action="POST" className="register-by-form">
            <input
              type="text"
              placeholder="Username"
              className="btn username"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="btn phoneNumber"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="btn email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="btn password"
              required
            />

            <input
              type="password"
              className="btn password"
              placeholder="Confirm Password"
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
