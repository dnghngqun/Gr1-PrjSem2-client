import React, { useEffect, useState } from "react";
// import Swiper JS
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";

import "./Css/Homepage.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Homepage = ({ isLoggedIn, onLogout }) => {
  const [selectedImage, setSelectedImage] = useState("ielts");

  useEffect(() => {
    Swiper.use([Navigation, Pagination, Autoplay]);
    const swiper = new Swiper(".swiper", {
      slidesPerView: 3, // hiện 3 slide
      direction: "horizontal", // ngang
      loop: true, // vòng lặp
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false, // dừng khi tương tác: không
      },
    });

    const slides = document.querySelectorAll(".slick-slide");
    slides.forEach((slide) => {
      slide.addEventListener("click", function () {
        const currentIndex = parseInt(this.getAttribute("tabindex"));
        let nextIndex;

        if (currentIndex === slides.length - 1) {
          nextIndex = 0;
        } else {
          nextIndex = currentIndex + 1;
        }

        slides.forEach((slide) => slide.classList.remove("active"));
        slides[nextIndex].classList.add("active");
      });
    });
  }, []);

  const handleClick = (id) => {
    setSelectedImage(id);
  };

  return (
    <div id="homepage">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <section className="section1" id="introduce">
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
                <span>Watch Video</span>
              </button>
            </div>
          </div>
          <div className="intro-right">
            <img src="assets/img/home-hero.webp" alt="..." />
            <div className="certificate">
              <div className="left">
                <img src="assets/img/certificate.webp" alt="..." />
              </div>
              <div className="right">
                <h5 className="title">Certificate</h5>
                <div className="content">
                  There are certificates for all courses.
                </div>
              </div>
            </div>
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
      {/* section2 */}
      <section className="section2">
        <div className="courseContainer">
          <div className="course-title">
            <h1>
              <strong>
                Most
                <br />
                popular course
              </strong>
            </h1>
          </div>
          <div className="swiper-container swiper">
            <div className="swiper-wrapper swiper-el">
              <div className="swiper-slide">
                <div className="card">
                  <img
                    src="assets/img/mostCourse1.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">UI/UX complete guide</h5>
                    <div className="star">★★★★★</div>
                    <div className="course-price">$53/course</div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="card">
                  {/* Nội dung card */}
                  <img
                    src="assets/img/mostCourse2.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">UI/UX complete guide</h5>
                    <div className="star">★★★★★</div>
                    <div className="course-price">$53/course</div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="card">
                  {/* Nội dung card */}
                  <img
                    src="assets/img/mostCourse4.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">UI/UX complete guide</h5>
                    <div className="star">★★★★★</div>
                    <div className="course-price">$53/course</div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="card">
                  {/* Nội dung card */}
                  <img
                    src="assets/img/mostCourse4.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">UI/UX complete guide</h5>
                    <div className="star">★★★★★</div>
                    <div className="course-price">$53/course</div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="card">
                  {/* Nội dung card */}
                  <img
                    src="assets/img/mostCourse5.webp"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">UI/UX complete guide</h5>
                    <div className="star">★★★★★</div>
                    <div className="course-price">$53/course</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="click-button">
              <div className="link-coursePage">
                <a href="/course">View All This Page</a>
              </div>

              <div className="arrow-container">
                <div className="swiper-button-prev">
                  <div className="arrow-wrapper">
                    <div className="arrow-background">
                      <svg
                        className="MuiSvgIcon-root"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="ArrowBackIcon">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="swiper-button-next">
                  <div className="arrow-wrapper">
                    <div className="arrow-background">
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1lf2qyz"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="ArrowForwardIcon">
                        <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section3 */}
      <section className="section3">
        <div className="container">
          <div className="container1">
            <div className="feature-img">
              <img src="assets/img/home-feature.webp" alt="..." />
              <div className="LoremIpsum">
                <strong>Lorem ipsum</strong>
                <p>Lorem ipsum</p>
                <svg className="progress-circle" viewBox="0 0 100 100">
                  <circle
                    className="progress-circle-background"
                    cx="50"
                    cy="50"
                    r="48"></circle>
                  <circle
                    className="progress-circle-progress"
                    cx="50"
                    cy="50"
                    r="48"
                    style={{
                      strokeDasharray: "301.44",
                      strokeDashoffset: 75.36,
                    }}></circle>
                  <text
                    x="50"
                    y="55"
                    className="progress-text"
                    dominantBaseline="middle">
                    75%
                  </text>
                </svg>
              </div>

              <div className="feature-content">
                <h1>Lorem ipsum dolor</h1>
                <ul>
                  <li>
                    <div className="progress-container">
                      <div className="progress-label">UI/UX Design</div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-inner pink"
                          style={{ width: "80%" }}></div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="progress-container">
                      <div className="progress-label">Mobile Development</div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-inner green"
                          style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="progress-container">
                      <div className="progress-label">Web Development</div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-inner blue"
                          style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container2">
            <div className="headline">
              <h1>
                Make your{" "}
                <span className="hightlight">
                  Learning
                  <img
                    src="assets/svg/headline-curve.svg"
                    className="curve-image"
                    alt="..."
                  />
                </span>{" "}
                Enjoyable
              </h1>
            </div>

            <div className="benefit-container">
              <div className="benefit">
                <div className="circle-container">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z"></path>
                  </svg>
                </div>
                <div className="benefit-one">
                  <div className="benefit-title">Easy Accessibility</div>
                  <div className="benefit-description">
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum
                    </p>
                  </div>
                </div>
              </div>
              <div className="benefit">
                <div className="circle-container">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="AttachMoneyIcon">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
                  </svg>
                </div>
                <div className="benefit-one">
                  <div className="benefit-title">More Affordable Cost</div>
                  <div className="benefit-description">
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum
                    </p>
                  </div>
                </div>
              </div>

              <div className="benefit">
                <div className="circle-container">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="LocalLibraryIcon">
                    <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path>
                  </svg>
                </div>
                <div className="benefit-one">
                  <div className="benefit-title">Flexible Study Time</div>
                  <div className="benefit-description">
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum
                    </p>
                  </div>
                </div>
              </div>

              <div className="benefit">
                <div className="circle-container">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ContactSupportIcon">
                    <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"></path>
                  </svg>
                </div>
                <div className="benefit-one">
                  <div className="benefit-title">Consultation With Mentor</div>
                  <div className="benefit-description">
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar">
            <div className="navcourse1">
              <button onClick={() => handleClick("ielts")}>IELTS</button>
            </div>
            <div className="navcourse2">
              <button onClick={() => handleClick("toeic4")}>
                TOEIC 4 Skills
              </button>
            </div>
            <div className="navcourse3">
              <button onClick={() => handleClick("toeic2")}>
                TOEIC 2 Skills
              </button>
            </div>
          </div>
          <div className="image-container">
            <img
              id="ielts"
              src="assets/img/processIelts.png"
              alt="IELTS"
              style={{ display: selectedImage === "ielts" ? "block" : "none" }}
            />
            <img
              id="toeic4"
              src="assets/img/processToeic4skill.png"
              alt="TOEIC 4 Skills"
              style={{ display: selectedImage === "toeic4" ? "block" : "none" }}
            />
            <img
              id="toeic2"
              src="assets/img/processToeic2skill.png"
              alt="TOEIC 2 Skills"
              style={{ display: selectedImage === "toeic2" ? "block" : "none" }}
            />
          </div>
        </div>
      </section>
      <section className="section4">
        <div className="section4-container">
          <h1>Our Expert Mentors</h1>
          <div className="swiper-container swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide mentor">
                <div className="mentor-container">
                  <img
                    src="assets/img/mentor1.webp"
                    className="mentor-img"
                    alt="..."
                  />
                  <h2 className="mentor-name">Leon S Kennedy</h2>
                  <div className="mentor-course">Machine Learning</div>
                  <p className="mentor-title">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <div className="logo-mentor">TOEIC</div>
                </div>
              </div>
              <div className="swiper-slide mentor">
                <div className="mentor-container">
                  <img
                    src="assets/img/mentor2.webp"
                    className="mentor-img"
                    alt="..."
                  />
                  <h2 className="mentor-name">Nguyen Thuy</h2>
                  <div className="mentor-course">Android Development</div>
                  <p className="mentor-title">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <div className="logo-mentor">IELTS</div>
                </div>
              </div>
              <div className="swiper-slide mentor">
                <div className="mentor-container">
                  <img
                    src="assets/img/mentor3.webp"
                    className="mentor-img"
                    alt="..."
                  />
                  <h2 className="mentor-name">Rizky Known</h2>
                  <div className="mentor-course">Fullstack Development</div>
                  <p className="mentor-title">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <div className="logo-mentor">TOEIC</div>
                </div>
              </div>
              <div className="swiper-slide mentor">
                <div className="mentor-container">
                  <img
                    src="assets/img/mentor4.webp"
                    className="mentor-img"
                    alt="..."
                  />
                  <h2 className="mentor-name">Jhon Dwirian</h2>
                  <div className="mentor-course">UX/UI Design</div>
                  <p className="mentor-title">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <div className="logo-mentor">IELTS</div>
                </div>
              </div>
            </div>

            <div className="swiper-pagination pagination-style"></div>

            <button type="button" className="swiper-button-next swiper-button">
              <img src="assets/svg/svgexport-10.svg" alt="right" />
            </button>
            <button type="button" className="swiper-button-prev swiper-button">
              <img src="assets/svg/svgexport-6.svg" alt="left" />
            </button>

            {/* <div className="swiper-scrollbar"></div> */}
          </div>
        </div>
      </section>
      {/* section5 */}
      <section>
        <div className="test-container">
          <div className="test-content">
            <div>
              <img src="assets/img/leaf.png" className="deco1"></img>
              <p>How would you like to assess your proficiency in English?</p>
              <a href="#">
                <b>Mini Test For You</b>
              </a>
              <img src="assets/img/leaf.png" className="deco2"></img>
            </div>
            <img src="assets/img/luyen-de-website.webp" alt="Image" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
