import React from "react";
import "./Css/UserCourse.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProgressBar from "./ProgressBar";
const UserCourse = ({ isLoggedIn, onLogout }) => {
  const sessions = [
    { status: "Present" },
    { status: "Absent" },
    { status: "NotStarted" },
    // Thêm các buổi học khác theo định dạng trên
    { status: "Present" },
    { status: "Absent" },
    { status: "NotStarted" },
    // ... tổng cộng 35 buổi học
  ];

  // Đảm bảo rằng có đủ 35 buổi học
  while (sessions.length < 35) {
    sessions.push({ status: "NotStarted" });
  }
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="userCourse-container">
        <div className="top">
          <div className="background"></div>
          <div className="avatar">
            <img src="/assets/img/home-hero.webp" alt="" />
          </div>
          <div className="user-fullname">Đặng Hồng Quân</div>
        </div>
        <div className="myCourse">
          <h1 className="mycourse-title">Registered courses</h1>
          <div className="course">
            <div className="left">
              <img
                src="/assets/img/course/ieltsBa.png"
                className="img-course"
                alt=""
              />
            </div>
            <div className="center">
              <div className="course-name">Toeic Basic</div>
              <div className="course-infomation">
                <div>
                  <b>Instructor: </b> John
                </div>
                <div>
                  <b>Learning Times: </b> 14h30-16h
                </div>
                <div>
                  <b>Start date: </b>2024-09-11
                </div>
              </div>
            </div>
            <div className="right">
              <div className="title-progress">Attendance Progress </div>
              <ProgressBar sessions={sessions} />
            </div>
          </div>
          <div className="course">
            <div className="left">
              <img
                src="/assets/img/course/ieltsBa.png"
                className="img-course"
                alt=""
              />
            </div>
            <div className="center">
              <div className="course-name">Toeic Basic</div>
              <div className="course-infomation">
                <div>
                  <b>Instructor: </b> John
                </div>
                <div>
                  <b>Learning Times: </b> 14h30-16h
                </div>
                <div>
                  <b>Start date: </b>2024-09-11
                </div>
              </div>
            </div>
            <div className="right">
              <div className="title-progress">Attendance Progress </div>
              <ProgressBar sessions={sessions} />
            </div>
          </div>{" "}
          <div className="course">
            <div className="left">
              <img
                src="/assets/img/course/ieltsBa.png"
                className="img-course"
                alt=""
              />
            </div>
            <div className="center">
              <div className="course-name">Toeic Basic</div>
              <div className="course-infomation">
                <div>
                  <b>Instructor: </b> John
                </div>
                <div>
                  <b>Learning Times: </b> 14h30-16h
                </div>
                <div>
                  <b>Start date: </b>2024-09-11
                </div>
              </div>
            </div>
            <div className="right">
              <div className="title-progress">Attendance Progress </div>
              <ProgressBar sessions={sessions} />
            </div>
          </div>{" "}
          <div className="course">
            <div className="left">
              <img
                src="/assets/img/course/ieltsBa.png"
                className="img-course"
                alt=""
              />
            </div>
            <div className="center">
              <div className="course-name">Toeic Basic</div>
              <div className="course-infomation">
                <div>
                  <b>Instructor: </b> John
                </div>
                <div>
                  <b>Learning Times: </b> 14h30-16h
                </div>
                <div>
                  <b>Start date: </b>2024-09-11
                </div>
              </div>
            </div>
            <div className="right">
              <div className="title-progress">Attendance Progress </div>
              <ProgressBar sessions={sessions} />
            </div>
          </div>{" "}
          <div className="course">
            <div className="left">
              <img
                src="/assets/img/course/ieltsBa.png"
                className="img-course"
                alt=""
              />
            </div>
            <div className="center">
              <div className="course-name">Toeic Basic</div>
              <div className="course-infomation">
                <div>
                  <b>Instructor: </b> John
                </div>
                <div>
                  <b>Learning Times: </b> 14h30-16h
                </div>
                <div>
                  <b>Start date: </b>2024-09-11
                </div>
              </div>
            </div>
            <div className="right">
              <div className="title-progress">Attendance Progress </div>
              <ProgressBar sessions={sessions} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserCourse;
