import React from "react";
import "./Css/Login.css";
const Login = () => {
  return (
    <div id="login">
      <div className="login-container">
        <div className="left">
          <img src="assets/img/images_login.jpg" alt="..." />
        </div>
        <div className="right">
          <h1 className="title">Member Login</h1>
          <form action="POST" className="login-by-form">
            <input
              type="text"
              placeholder="Username, email or phone number"
              className="btn username"
            />

            <input
              type="password"
              className="btn password"
              placeholder="Password"
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
            <a href="#">
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
