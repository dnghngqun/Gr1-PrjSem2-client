import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Css/Homepage.css";
import Navbar from "./Navbar";
const Homepage = () => {
  return (
    <div id="homepage">
      <Navbar />
      <section id="introduce">
        <div className="intro-container">
          <div className="intro-left">
            <h2 className="title">
              <mark className="improve">
                Improve
                <img
                  className="headline"
                  src="assets/svg/headline-curve.svg"
                  alt="svg"
                />
              </mark>
              <span className="title-left-svg">
                {" "}
                your Skill
                <img
                  className="svg-top-skill"
                  src="assets/svg/svgexport-2.svg"
                  style={{ width: "23px", height: "26px" }}
                  alt="svg-top-skill"
                />
              </span>
              <br />
              with Different Way
            </h2>
            <p className="content">
              Let's take an online course to improve your skills in a different
              way, you can set your own study time according to your learning
              speed. So you san study comfortable and absorb tge material
              easily.
            </p>
            <div className="btn-intro">
              <button className="button btn1">
                <span>Get Started</span>
              </button>
              <button className="button btn2">
                <FontAwesomeIcon icon="fa-solid fa-play" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>
          <div className="intro-right">
            <img src="assets/img/home-hero.webp" alt="intro-image" />
          </div>
        </div>
        <div className="intro-bottom">
          <div className="container">
            <div className="left">
              <p>10K+</p>
              <h5>Students</h5>
            </div>
            <div className="center">
              <p>20+</p>
              <h5>Quality Course</h5>
            </div>
            <div className="right">
              <p>10+</p>
              <h5>Experience Mentors</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
