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
            <h1 className="title">
              <mark className="Improve">
                Improve
                <img src="assets/svg/headline-curve.svg" alt="svg" />
              </mark>
              your
              <span>Skill</span>
              <img
                src="assets/svg/svgexport-2.svg"
                style={{ width: "23px", height: "26px" }}
                alt="svg-top-skill"
              />
            </h1>
          </div>
          <div className="intro-right">
            <img src="assets/img/home-hero.webp" alt="intro-image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
