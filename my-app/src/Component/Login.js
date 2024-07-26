import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import "./Css/Login.css";
const Login = ({ onLogin }) => {
  const [identify, setIdentify] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/accounts/currentUser",
          { withCredentials: true }
        );
        if (response.status === 200) {
          onLogin(response.data);
          if (response.data.data.role === "admin") navigate("/admin"); //redirect to link /
          if (response.data.data.role === "instructor") navigate("/instructor"); //redirect to link /
          if (response.data.data.role === "customer") navigate("/"); //redirect to link /
         
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
        if (response.data.data.role === "admin") navigate("/admin"); //redirect to link /
        if (response.data.data.role === "instructor") navigate("/instructor"); //redirect to link /
        if (response.data.data.role === "customer") navigate("/"); //redirect to link /
       
      } else {
        //login failed
        notifyFail("Login failed, username or password is incorrect!");
      }
    } catch (error) {
      notifyFail("Login failed, username or password is incorrect!");
      console.error("Error: ", error);
    }
  };
  return (
    <div id="login">
      <div className="login-container">
        <div className="left">
          <img src="/assets/img/images_login.jpg" alt="..." />
        </div>
        <div className="right">
          <h1 className="title">Member Login</h1>
          <form className="login-by-form" method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username, email or phone number"
              className="btn username"
              onChange={(e) => setIdentify(e.target.value)}
            />

            <input
              type="password"
              className="btn password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className=" btn btn-submit">
              <b>Sign in</b>
            </button>

            <a href="/forgot-password" className="forgot">
              Forgot <span>Username/Password?</span>
            </a>
          </form>
          <b className="text-line">or sign in with</b>
          <div className="login-other">
            <a href="#">
              <img
                src="/assets/svg/google.svg"
                alt=""
                className="icon-login google-icon"
              />
            </a>
            <a href="#">
              <img
                src="/assets/svg/Facebook.svg"
                alt=""
                className="icon-login facebook-icon"
              />
            </a>
            <a href="">
              <img
                src="/assets/svg/SquareXTwitter.svg"
                alt=""
                className="icon-login twitter-icon"
              />
            </a>
          </div>
          <div className="create-account">
            <a href="/register">
              Create your account{" "}
              <img src="/assets/svg/RightLongSolid.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
