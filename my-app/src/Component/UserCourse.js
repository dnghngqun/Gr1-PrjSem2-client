import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/UserCourse.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProgressBar from "./ProgressBar";
const UserCourse = ({ isLoggedIn, onLogout }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/enrollments/user/${isLoggedIn.data.id}`
      )
      .then((response) => {
        setEnrollments(response.data.data);
        console.log("Enrollment: ", response.data.data);
      })
      .catch((error) => console.error("Error fetch enrollment: ", error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tạo mảng promise để gọi API lấy dữ liệu điểm danh cho từng enrollment
        const fetchAttendancePromises = enrollments.map(async (enrollment) => {
          const schedule = await axios
            .get(
              `http://localhost:8080/api/v1/attendance/schedule/class/${enrollment.aClass.id}`
            );
            let scheduleRes = schedule.data.data;
           
          const response = await axios.get(
            `http://localhost:8080/api/v1/attendance/enrollment/${enrollment.id}`
          );
          let session = response.data.data;

          // Đảm bảo session có đủ số buổi học dựa trên enrollment.progress
          while (session.length < scheduleRes.length) {
            session.push({ attendanceStatus: "notStarted" });
          }

          return { enrollmentId: enrollment.id, data: session };
        });

        // Chờ tất cả các request API lấy dữ liệu điểm danh hoàn thành
        const attendanceResults = await Promise.all(fetchAttendancePromises);

        // Tạo một object mới với enrollmentId là key và dữ liệu điểm danh là value
        const newAttendanceMap = {};
        attendanceResults.forEach(({ enrollmentId, data }) => {
          newAttendanceMap[enrollmentId] = data;
        });

        setAttendanceMap(newAttendanceMap);
        // Bây giờ bạn có thể sử dụng newAttendanceMap cho các xử lý tiếp theo
        console.log("Dữ liệu điểm danh:", newAttendanceMap);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu điểm danh:", error);
      }
    };

    fetchData();
  }, [enrollments]); // Đảm bảo useEffect chạy lại khi enrollments thay đổi

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="userCourse-container">
        <div className="top">
          <div className="background"></div>
          <div className="avatar">
            <img src={isLoggedIn.data.imageAccount} alt="" />
          </div>
          <div className="user-fullname">{isLoggedIn.data.fullName}</div>
        </div>
        <div className="myCourse">
          <h1 className="mycourse-title">Registered courses</h1>
          {enrollments &&
            enrollments.map((enrollment) => {
              return (
                <div className="course">
                  <div className="left">
                    <img
                      src={enrollment.aClass.course.imgLink}
                      className="img-course"
                      alt=""
                    />
                  </div>
                  <div className="center">
                    <div className="course-name">
                      {enrollment.aClass.course.name}
                    </div>
                    <div className="course-infomation">
                      <div>
                        <b>Instructor: </b> {enrollment.aClass.instructor.name}
                      </div>
                      <div>
                        <b>Learning Times: </b> {enrollment.aClass.location}
                      </div>
                      <div>
                        <b>Start date: </b>
                        {enrollment.aClass.startDate}
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="title-progress">Attendance Progress </div>
                    <ProgressBar
                      sessions={attendanceMap[enrollment.id] || []}
                    />
                  </div>
                </div>
              );
            })}

          {/* <div className="course">
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
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserCourse;
