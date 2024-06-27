
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./Css/Course.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Course = ({isLoggedIn, onLogout}) => {
  useEffect(() => {
    // Swiper initialization for course-swiper
    var courseSwiper = new Swiper(".course-swiper", {
      spaceBetween: 300,
      centeredSlides: true,
      loop: true,
      direction: "horizontal",
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

    // Swiper initialization for popular-swiper
    var popularSwiper = new Swiper(".popular-swiper", {
      slidesPerView: 3,
      direction: "horizontal",
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

    // Search functionality
    document.getElementById('course-select').addEventListener('change', function() {
      const value = this.value;
      const englishCourses = document.querySelectorAll('.english-course');
      const toeicCourses = document.querySelectorAll('.toeic-course');

      // Ẩn tất cả các thẻ card
      document.querySelectorAll('.card').forEach(course => course.style.display = 'none');

      if (value === 'english-course') {
        englishCourses.forEach(course => course.style.display = 'block');
      } else if (value === 'toeic-course') {
        toeicCourses.forEach(course => course.style.display = 'block');
      }
    });

    document.querySelector('.search-input').addEventListener('input', function() {
      const filter = this.value.toUpperCase();
      const cards = document.querySelectorAll('.card');

      cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toUpperCase();
        if (title.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }, []); // useEffect dependency array is empty to run only once on mount

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

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
        <option value="">SELECTION COURSE</option>
            <option value="english-course">IELTS COURSE</option>
            <option value="toeic-course">TOEIC COURSE</option>
        </select>
        <input type="text" className="search-input form-control" placeholder="Search courses..." />
    </div>
    <div className="course-card">
        <div className="card english-course">
            <img src="assets/img/mostCourse1.webp" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Android Development from zero to hero</h5>
                <div className="star">★★★★★</div>
                <div className="course-price">$53/course</div>
            </div>
        </div>
        <div className="card english-course">
            <img src="assets/img/mostCourse2.webp" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">UI/UX complete guide</h5>
                <div className="star">★★★★★</div>
                <div className="course-price">$53/course</div>
            </div>
        </div>
        <div className="card english-course">
            <img src="assets/img/mostCourse4.webp" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Mastering Data Modeling Fundamentals</h5>
                <div className="star">★★★★★</div>
                <div className="course-price">$53/course</div>
            </div>
        </div>
        <div className="card english-course">
            <img src="assets/img/mostCourse5.webp" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Adobe Lightroom for Beginners: Complete Photo</h5>
                <div className="star">★★★★★</div>
                <div className="course-price">$53/course</div>
            </div>
        </div>
        <div className="card toeic-course">
            <img src="assets/img/mostCourse6.webp" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Model React with MUI & Redux</h5>
                <div className="star">★★★★★</div>
                <div className="course-price">$53/course</div>
            </div>
        </div>
        <div className="card toeic-course">
            <img src="assets/img/mostCourse7.webp" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">The Complete Guide to Docker and Kubernetes</h5>
                <div className="star">★★★★★</div>
                <div className="course-price">$53/course</div>
            </div>
        </div>
        <div className="card toeic-course">
            <img src="assets/img/mostCourse8.webp" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Ethical Hacking Bootcamp: Zero to Mastery</h5>
                <div className="star">★★★★★</div>
                <div className="course-price">$53/course</div>
            </div>
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
