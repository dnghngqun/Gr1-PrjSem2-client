import React from "react";
import "./Css/Login.css";
const Login = () => {
  return (
    <div id="login">
      <div className="login-container">
        <div className="left">
          <img src="assets/img/images_login.png" alt="..." />
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
          <div className="login-other"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
