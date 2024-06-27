import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Login.css";

const Login = ({ onLogin }) => {
  const [identify, setIdentify] = useState("");
  const [password, setPassword] = useState("");

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
    checkLoginStatus(); //call function to check status login
  }, [navigate, onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/accounts/login",
        {
          identify,
          password,
        },
        { withCredentials: true }
      );
      console.log("data response: ", response.data);
      if (response.status === 200) {
        // login success
        console.log("Login successful");
        onLogin(response.data);
        navigate("/"); //redirect to link /
      } else {
        //login failed
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <div id="login">
      <div className="login-container">
        <div className="left">
          <img src="assets/img/images_login.jpg" alt="..." />
        </div>
        <div className="right">
          <h1 className="title">Member Login</h1>
          <form className="login-by-form" method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username, email or phone number"
              className="btn username"
              value={identify} //this value save to identify
              onChange={(e) => setIdentify(e.target.value)}
            />

            <input
              type="password"
              className="btn password"
              placeholder="Password"
              value={password} //this value save to password
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className=" btn btn-submit">
              <b>Sign in</b>
            </button>

            <a href="#" className="forgot">
              Forgot <span>Username/Password?</span>
            </a>
          </form>
          <b className="text-line">or sign in with</b>
          <div className="login-other">
            <a href="#">
              <img
                src="assets/svg/google.svg"
                alt=""
                className="icon-login google-icon"
              />
            </a>
            <a href="#">
              <img
                src="assets/svg/Facebook.svg"
                alt=""
                className="icon-login facebook-icon"
              />
            </a>
            <a href="">
              <img
                src="assets/svg/SquareXTwitter.svg"
                alt=""
                className="icon-login twitter-icon"
              />
            </a>
          </div>
          <div className="create-account">
            <a href="/register">
              Create your account{" "}
              <img src="assets/svg/RightLongSolid.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
