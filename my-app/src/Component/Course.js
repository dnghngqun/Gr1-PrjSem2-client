import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
// import Swiper styles
import ReactPaginate from "react-paginate";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "./Css/Course.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

import axios from "axios";

const Course = ({ isLoggedIn, onLogout }) => {
  const [product, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    // DOMContentLoaded functionality
    // const dots = document.querySelectorAll(".dot");
    // const cards = document.querySelectorAll(".card");

    // dots.forEach((dot, index) => {
    //   dot.addEventListener("click", function () {
    //     const page = parseInt(this.getAttribute("data-page"));

    //     // Remove 'active' class from all dots
    //     dots.forEach((dot) => dot.classList.remove("active"));
    //     // Add 'active' class to the clicked dot
    //     this.classList.add("active");

    //     // Update current page state
    //     setCurrentPage(page);
    //   });
    // });

    //get infomation product
    axios
      .get("http://localhost:8080/api/v1/courses")
      .then((response) => {
        setProducts(response.data);
        console.log("Response data: ", product);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });

    // Initialize Swiper for course-swiper
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

    // Initialize Swiper for popular-swiper
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
    document
      .getElementById("course-select")
      .addEventListener("change", function () {
        const value = this.value;
        const englishCourses = document.querySelectorAll(".ielts-course");
        const toeic2Courses = document.querySelectorAll(".toeic2-course");
        const toeic4Courses = document.querySelectorAll(".toeic4-course");

        // Ẩn tất cả các thẻ card
        document
          .querySelectorAll(".card")
          .forEach((course) => (course.style.display = "none"));

        if (value === "ielts-course") {
          englishCourses.forEach((course) => (course.style.display = "block"));
        } else if (value === "toeic2-course") {
          toeic2Courses.forEach((course) => (course.style.display = "block"));
        } else if (value === "toeic4-course") {
          toeic4Courses.forEach((course) => (course.style.display = "block"));
        } else {
          // Hiển thị tất cả các khóa học
          document
            .querySelectorAll(".card")
            .forEach((course) => (course.style.display = "block"));
        }
      });

    document
      .querySelector(".search-input")
      .addEventListener("input", function () {
        const filter = this.value.toUpperCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach((card) => {
          const title = card
            .querySelector(".card-title")
            .textContent.toUpperCase();
          if (title.includes(filter)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
  }, []); // useEffect dependency array is empty to run only once on mount

  //calculate current product
  const offset = currentPage * productsPerPage;
  const currentProducts = product.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(product.length / productsPerPage);
  const productListRef = useRef(null); // Ref cho danh sách sản phẩm
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    // Cuộn lên đầu danh sách sản phẩm khi chuyển trang
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // useEffect(() => {
  //   // Update card visibility based on current page state
  //   const cards = document.querySelectorAll(".card");

  //   cards.forEach((card, index) => {
  //     const cardPage = index < 4 ? 1 : 2; // first 4 cards belong to page 1, rest belong to page 2
  //     if (cardPage === currentPage || isNaN(currentPage)) {
  //       card.style.display = "block";
  //     } else {
  //       card.style.display = "none";
  //     }
  //   });
  // }, [currentPage]);

  const getClassName = (classify) => {
    switch (classify) {
      case "TOEIC2":
        return "toeic2-course";
      case "IELTS":
        return "ielts-course";
      case "TOEIC4":
        return "toeic4-course";
      default:
        return "";
    }
  };
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
            <div className="course-container ">
              <div ref={productListRef} className="search-course">
                <select id="course-select" className="form-select">
                  <option value="">SELECTION COURSE</option>
                  <option value="ielts-course">IELTS</option>
                  <option value="toeic2-course">TOEIC 2 SKILLS</option>
                  <option value="toeic4-course">TOEIC 4 SKILLS</option>
                </select>
                <input
                  type="text"
                  className="search-input form-control"
                  placeholder="Search courses..."
                />
              </div>
              <div className="course-card container-fluid">
                <div className="row gy-3">
                  {currentProducts.map((product) => {
                    const className = getClassName(product.classify);
                    if (!className) return null; // Nếu không phải 1 trong 3 loại trên thì không hiển thị
                    return (
                      <div
                        key={product.id}
                        className={`card ${className} col-xxl-2 col-xl-3 col-md-4`}>
                        <a href="/course/view" className="link-to-view-page">
                          <img
                            src={product.imgLink}
                            className="card-img-top"
                            alt={product.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <div className="card-bottom">
                              <div className="course-price">
                                ${product.price}/course
                              </div>
                              <div className="star">★★★★★</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination_course"}
            previousLinkClassName={"pagination__link pagination_previous"}
            nextLinkClassName={"pagination__link pagination_next"}
            activeClassName={"pagination__link--active"}
          />
          {/* <div className="pagination2">
            <span
              className={`dot ${currentPage === 1 ? "active" : ""}`}
              data-page="1">
              1
            </span>
            <span
              className={`dot ${currentPage === 2 ? "active" : ""}`}
              data-page="2">
              2
            </span>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Course;
