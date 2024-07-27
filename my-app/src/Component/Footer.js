import React from "react";
import "./Css/Footer.css";
const Footer = () => {
  return (
    <div id="footer">
      <div className="Fcontainer">
        <div className="left">
          <img src="https://i.imgur.com/8epSVJH.png" alt="" />
          <p className="title">
            Coursespace is an online learning platform that has been operating
            since 2018 until now.<br/>
            Call 19001567 for English consultation.
          </p>
         
          <div className="external-link">
            <img src="/assets/svg/facebook.svg" alt="facebook" />
            <img src="/assets/svg/instagram.svg" alt="instagram" />
            <img src="/assets/svg/tiktok.svg" alt="tiktok" />
          </div>
        </div>
        <ul className="list">
          <li className="list-content list-title">
            <b>Course</b>
          </li>
          <li className="list-content">
            <a href="#">UI/UX Design</a>
          </li>
          <li className="list-content">
            <a href="#">Mobile Development</a>
          </li>
          <li className="list-content">
            <a href="#">Machine Learning</a>
          </li>
          <li className="list-content">
            <a href="#">Web Development</a>
          </li>
        </ul>
        <ul className="list">
          <li className="list-content list-title">
            <b>Menu</b>
          </li>
          <li className="list-content">
            <a href="#">Home</a>
          </li>
          <li className="list-content">
            <a href="#">Courses</a>
          </li>
          <li className="list-content">
            <a href="#">Testimonial</a>
          </li>
          <li className="list-content">
            <a href="#">Mentor</a>
          </li>
        </ul>
        <ul className="list">
          <li className="list-content list-title">
            <b>About</b>
          </li>
          <li className="list-content">
            <a href="#">Contact Us</a>
          </li>
          <li className="list-content">
            <a href="#">Privacy & Policy</a>
          </li>
          <li className="list-content">
            <a href="#">Term & Condition</a>
          </li>
          <li className="list-content">
            <a href="#">FAQ</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
