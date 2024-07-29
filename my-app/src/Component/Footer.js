import React from "react";
import { Link } from "react-router-dom";
import "./Css/Footer.css";
const Footer = () => {
  return (
    <div id="footer">
      <div className="Fcontainer">
        <div className="left">
          <img src="https://i.imgur.com/8epSVJH.png" alt="" />
          <p className="title">
            Learnify is an online learning platform that has been operating
            since 2018 until now.
            <br />
            Contact 0383240511 for consultation.
          </p>

          <div className="external-link">
            <img src="/assets/svg/facebook.svg"  alt="facebook" />
            <img src="/assets/svg/instagram.svg" alt="instagram" />
            <img src="/assets/svg/tiktok.svg" alt="tiktok" />
          </div>
        </div>

        <ul className="list">
          <li className="list-content list-title">
            <b>Menu</b>
          </li>
          <li className="list-content">
            <Link to="/">Home</Link>
          </li>
          <li className="list-content">
            <Link href="/course">Courses</Link>
          </li>
          <li className="list-content">
            <Link href="/#testimonial">Testimonial</Link>
          </li>
          <li className="list-content">
            <Link href="/#mentor">Mentor</Link>
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
