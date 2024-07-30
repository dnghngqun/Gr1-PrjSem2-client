import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Css/InstrucCs.css";
import "./Css/Instructor.css";
import NavInstructor from "./NavInstructor";
import SideBarInstructor from "./SideBarInstructor";
const Instructor = ({ isLoggedIn, onLogout }) => {
  const [instructor, setInstructor] = useState({});

  const [classToday, setClassToday] = useState([]);
  const [countStudent, setCountStudent] = useState("0");
  const dateToday = new Date();
  const currentDate =
    dateToday.getFullYear() +
    "-" +
    String(dateToday.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateToday.getDate()).padStart(2, "0");

  //const currentDate = "2024-08-08"; //cái này để test cho buổi sau , mấy ngày khác tương tự, có thể xem lịch trong db phần insert schedule
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [isAttendance, setIsAttendance] = useState({});
  const [schedule, setSchedule] = useState([]);

  // Hàm kiểm tra xem điểm danh đã được thực hiện chưa
  const checkAttendanceStatus = (classId) => {
    console.log("Classid: ", classId);
    axios
      .get(
        `http://localhost:8080/api/v1/attendance/class/${classId}/date/${currentDate}`
      )
      .then((res) => {
        const data = res.data;
        // Làm mới attendanceStatus cho ngày mới
        const newAttendanceStatus = {};
        data.forEach((item) => {
          newAttendanceStatus[item.enrollment.account.id] =
            item.attendanceStatus;
        });
        setAttendanceStatus(newAttendanceStatus);
        if (Object.keys(newAttendanceStatus).length > 0) {
          setIsAttendance((prevState) => ({
            ...prevState,
            [classId]: true,
          }));
        }
        console.log("is attendance after: ", isAttendance);
      })
      .catch((err) => {
        console.error("Error checking attendance status:", err);
      });
  };

  useEffect(() => {
    // Lấy dữ liệu lịch trình theo ngày hiện tại
    axios
      .get("http://localhost:8080/api/v1/attendance/schedule", {
        params: {
          classDate: currentDate,
          email: isLoggedIn.data.email,
        },
      })
      .then((res) => {
        setSchedule(res.data.data);
        // Tạo một bản đồ điểm danh với giá trị khởi tạo là false
        let dataCurrentDay = res.data.data;
        const attendanceMap = dataCurrentDay.reduce((acc, item) => {
          acc[item.aClass.id] = false; // Hoặc giá trị attendance mình muốn
          return acc;
        }, {});
        console.log("Atten map: ", attendanceMap);

        setIsAttendance(attendanceMap);

        let dataRes = res.data.data;
        // Kiểm tra trạng thái điểm danh cho tất cả các lớp học
        dataRes.forEach((item) => {
          checkAttendanceStatus(item.aClass.id);
        });
      })
      .catch((err) => console.error("Error to fetch schedule: ", err));
  }, [currentDate]);

  //lấy thông tin giáo viên theo email
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/instructors/email/${isLoggedIn.data.email}`
      )
      .then((res) => {
        setInstructor(res.data);
      })
      .catch((err) => console.error("Err to fetch instructor: ", err));
  }, []);

  useEffect(() => {
    // Lấy dữ liệu lịch trình theo ngày hiện tại
    axios
      .get("http://localhost:8080/api/v1/attendance/schedule", {
        params: {
          classDate: currentDate,
          email: isLoggedIn.data.email,
        },
      })
      .then((res) => {
        setClassToday(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.error("Error to fetch schedule: ", err));
  }, [currentDate]);

  console.log("instructor", instructor.id);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/enrollments/instructors/${instructor.id}/students/counts`
      )
      .then((res) => {
        setCountStudent(res.data);
      })
      .catch((err) => {
        console.error("Err to fetch count student: ", err);
      });
  }, [instructor]);

  return (
    <div>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed">
        {/* left side-bar */}
        <SideBarInstructor onLogout={onLogout} />

        {/* right */}
        <div className="body-wrapper">
          {/* header */}
          <NavInstructor isLoggedIn={isLoggedIn} />
          {/* body */}
          <div className="container-fluid">
            <h3 className="pt-0 pb-0" style={{ fontWeight: "700" }}>
              Welcome Back, {isLoggedIn.data.fullName} 🎉
            </h3>
            <span
              className="pb-4"
              style={{ fontSize: "20px", display: "block" }}>
              Have a nice day ☁️
            </span>
            <div className="row row-classToday">
              <h3 style={{ fontWeight: "600" }}>Your Class Today</h3>
              {classToday.length === 0 ? (
                <p style={{ color: "gray", fontSize: "15px" }}>
                  Congratulations, you don't have any classes to teach today.
                </p>
              ) : (
                classToday.map((item, index) => {
                  return (
                    <div className="col-lg-6" key={index}>
                      <div className="card">
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={item.aClass.course.imgLink}
                              alt=""
                              style={{ objectFit: "cover", height: "100%" }}
                              className="img-fluid rounded-start"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h2
                                className="card-title pt-3 pb-1"
                                style={{ fontSize: "25px" }}>
                                {item.aClass.course.name}
                              </h2>
                              <p
                                className="card-text mb-1"
                                style={{ fontSize: "17px" }}>
                                Study time: {item.aClass.location}
                              </p>
                              <p
                                className="card-text mb-1"
                                style={{ fontSize: "17px" }}>
                                Start Date: {item.aClass.startDate}
                              </p>
                              <p
                                className="card-text mb-1"
                                style={{ fontSize: "17px" }}>
                                End Date: {item.aClass.endDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="row mt-3">
              <div className="col-lg-8" style={{ paddingLeft: "0" }}>
                <div
                  className="card w-100 overflow-hidden"
                  style={{ marginLeft: "0" }}>
                  <div className="card-body p-4">
                    <Link to="/instructor/attendance">
                      <h5
                        className="card-title mb-9 fw-semibold"
                        style={{ fontSize: "26px" }}>
                        Attendance
                      </h5>
                    </Link>
                    <div className="row align-items-center">
                      <div className="col-12">
                        <table className="table text-nowrap mb-0 align-middle">
                          <thead className="text-dark fs-4">
                            <tr>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Id</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Name</h6>
                              </th>
                              <th className="border-bottom-0">
                                <h6 className="fw-semibold mb-0">Status</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {schedule && schedule.length > 0 ? (
                              schedule.map((itemSchedule, index) => {
                                let classCurrent = itemSchedule.aClass;

                                let status = isAttendance[classCurrent.id]
                                  ? "Took attendance"
                                  : "No attendance yet";

                                return (
                                  <>
                                    <tr key={classCurrent.id}>
                                      <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">
                                          {index + 1}
                                        </h6>
                                      </td>
                                      <td className="border-bottom-0">
                                        <h6
                                          className="fw-semibold mb-0"
                                          style={{ width: "100px" }}>
                                          {classCurrent.course.name}
                                        </h6>
                                      </td>

                                      <td className="border-bottom-0">
                                        <span
                                          className="badge bg-warning rounded-3 fw-semibold"
                                          style={{ width: "150px" }}>
                                          {status}
                                        </span>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan={6} className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">
                                    You don't have any classes to teach today.
                                  </h6>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                {" "}
                <div className="card w-100 overflow-hidden">
                  <div className="card-body p-4">
                    <h1
                      className="card-title mb-2 fw-semibold"
                      style={{ fontSize: "26px" }}>
                      Total Students
                    </h1>
                    <div className="row align-items-center">
                      <div className="col-7">
                        <h4
                          className="fw-semibold mb-3"
                          style={{ textAlign: "center" }}>
                          {"  "}
                          {countStudent} students
                        </h4>
                      </div>
                      <div className="col-5">
                        <img
                          src="/assets/img/student.png"
                          className="w-100"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
