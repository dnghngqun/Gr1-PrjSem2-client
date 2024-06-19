import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./Css/Course.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Course = () => {
  useEffect(() => {
    var courseSwiper = new Swiper(".course-swiper", {
      spaceBetween: 300,
      centeredSlides: true,
      loop: true,
      direction: "horizontal", // ngang
      modules: [Autoplay, Pagination, Navigation],
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".course-swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".course-swiper .swiper-button-next",
        prevEl: ".course-swiper .swiper-button-prev",
      },
    });

    var popularSwiper = new Swiper(".popular-swiper", {
      slidesPerView: 3,
      direction: "horizontal", // ngang
      loop: true,
      modules: [Autoplay, Pagination, Navigation],
      pagination: {
        el: ".popular-swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".popular-swiper .swiper-button-prev",
        prevEl: ".popular-swiper .swiper-button-next",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  });
  return (
    <div>
      <Navbar />
      <div id="CoursePage">
        <div className="page-course">
          <div className="introduct-course">
            <div className="swiper course-swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="text-title">
                    <h3 style={{ color: "#fff" }}>
                      Unlock your potential and open doors to new opportunities
                      with our comprehensive English language course!
                    </h3>
                  </div>
                  <div className="img-title">
                    <img src="assets/img/imgCourseSlidePage.png" alt="" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="text-title">
                    <h3 style={{ color: "#fff" }}>
                      Unlock your potential and open doors to new opportunities
                      with our comprehensive English language course!
                    </h3>
                  </div>
                  <div className="img-title">
                    <img src="assets/img/anhnguzim.png" alt="" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="text-title">
                    <h3 style={{ color: "#fff" }}>
                      Unlock your potential and open doors to new opportunities
                      with our comprehensive English language course!
                    </h3>
                  </div>
                  <div className="img-title">
                    <img src="assets/img/ielts1.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="course-center">
            <div className="search-course">
              <select id="course-select" className="form-select">
                <option value="english-course">Khóa học Tiếng Anh</option>
                <option value="toeic-course">Khóa học TOEIC</option>
              </select>
              <input
                type="text"
                className="search-input form-control"
                placeholder="Search courses..."
              />
            </div>

            <div className="course-card">
              <div className="swiper popular-swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="card">
                      <img
                        src="assets/img/mostCourse1.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Android Development from zero to hero
                        </h5>
                        <div className="star">★★★★★</div>
                        <div className="course-price">$53/course</div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card">
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
                      <img
                        src="assets/img/mostCourse4.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Mastering Data Modeling Fundamentals
                        </h5>
                        <div className="star">★★★★★</div>
                        <div className="course-price">$53/course</div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card">
                      <img
                        src="assets/img/mostCourse5.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Adobe Lightroom for Beginners: Complete Photo
                        </h5>
                        <div className="star">★★★★★</div>
                        <div className="course-price">$53/course</div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card">
                      <img
                        src="assets/img/mostCourse6.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Model React with MUI & Redux
                        </h5>
                        <div className="star">★★★★★</div>
                        <div className="course-price">$53/course</div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card">
                      <img
                        src="assets/img/mostCourse7.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          The Complete Guide to Docker and Kubernetes
                        </h5>
                        <div className="star">★★★★★</div>
                        <div className="course-price">$53/course</div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="card">
                      <img
                        src="assets/img/mostCourse8.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Ethical Hacking Bootcamp: Zero to Mastery
                        </h5>
                        <div className="star">★★★★★</div>
                        <div className="course-price">$53/course</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-button-next">
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
                <div className="swiper-button-prev">
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

                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Course;
