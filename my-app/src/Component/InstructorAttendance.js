import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import NavInstructor from "./NavInstructor";
import SideBarInstructor from "./SideBarInstructor";
const InstructorAttendance = ({ isLoggedIn, onLogout }) => {
  const dateToday = new Date();
  const currentDate =
    dateToday.getFullYear() +
    "-" +
    String(dateToday.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateToday.getDate()).padStart(2, "0");
  //const currentDate = "2024-08-08"; //cái này để test cho buổi sau , mấy ngày khác tương tự, có thể xem lịch trong db phần insert schedule

  const [isShowWithId, setIsShowWithId] = useState(null);
  const [enrollmentByClassId, setEnrollmentByClassId] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [isAttendance, setIsAttendance] = useState({});
  const [schedule, setSchedule] = useState([]);
  const notify = (mess) =>
    toast({
      text: mess,
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      close: true,
      onClick: function () {}, // Callback after click
    }).showToast();

  const notifyFail = (err) =>
    toast({
      text: err,
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #c50e0e, #ec6554)",
      },
      close: true,
      onClick: function () {}, // Callback after click
    }).showToast();

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

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));
  };

  const handleSaveAttendance = (classId, scheduleId) => {
    const attendanceData = enrollmentByClassId.map((student) => {
      console.log("Student: ", student);
      console.log("Schedule: ", scheduleId);
      return {
        enrollmentId: student.id,
        scheduleId: scheduleId,
        status: attendanceStatus[student.account.id]
          ? attendanceStatus[student.account.id]
          : "present",
      };
    });

    axios
      .post("http://localhost:8080/api/v1/attendance/add/bulk", attendanceData)
      .then((response) => {
        notify("Attendance saved successfully!");
        // Kiểm tra trạng thái điểm danh lại sau khi lưu
        checkAttendanceStatus(classId);
      })
      .catch((error) => {
        notifyFail("Failed to save attendance");
        console.error("Error saving attendance:", error);
      });
  };

  const handleUpdateAttendance = (classId, scheduleId) => {
    const attendanceData = enrollmentByClassId.map((student) => {
      return {
        enrollmentId: student.id,
        scheduleId: scheduleId,
        status: attendanceStatus[student.account.id]
          ? attendanceStatus[student.account.id]
          : "present",
      };
    });

    axios
      .put(
        "http://localhost:8080/api/v1/attendance/update/bulk",
        attendanceData
      )
      .then((response) => {
        notify("Attendance update successfully!");
        // Kiểm tra trạng thái điểm danh lại sau khi lưu
        checkAttendanceStatus(classId);
      })
      .catch((error) => {
        notifyFail("Failed to update attendance");
        console.error("Error saving attendance:", error);
      });
  };
  const handleShow = (id) => {
    setIsShowWithId(id);
    axios
      .get(`http://localhost:8080/api/v1/enrollments/class/${id}`)
      .then((res) => setEnrollmentByClassId(res.data.data))
      .catch((err) => {
        notifyFail("No student in class, if error, please check in console!");
        console.log("Error to fetch student: ", err);
        setIsShowWithId(null);
      });
    console.log(enrollmentByClassId);
  };

  const handleHide = () => {
    setIsShowWithId(null);
  };
  return (
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
          <div className="row">
            <div className="col-lg-12 d-flex align-items-stretch">
              <div className="card w-100">
                <div className="card-body p-4">
                  <h5 className="card-title fw-semibold mb-4">
                    Attendance {"(" + currentDate + ")"}
                  </h5>
                  <div className="table-responsive">
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
                            <h6 className="fw-semibold mb-0">Study Time</h6>
                          </th>
                          <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Start Date</h6>
                          </th>
                          <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">End Date</h6>
                          </th>{" "}
                          <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Status</h6>
                          </th>
                          <th className="border-bottom-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule && schedule.length > 0 ? (
                          schedule.map((itemSchedule, index) => {
                            let classCurrent = itemSchedule.aClass;
                            let isShow = isShowWithId === classCurrent.id;

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
                                    <div className="d-flex align-items-center gap-2">
                                      <span
                                        className="badge bg-secondary rounded-3 fw-semibold"
                                        style={{ width: "90px" }}>
                                        {classCurrent.location}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <span
                                      className="badge bg-secondary rounded-3 fw-semibold"
                                      style={{ width: "100px" }}>
                                      {classCurrent.startDate}
                                    </span>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <span
                                        className="badge bg-secondary rounded-3 fw-semibold"
                                        style={{ width: "100px" }}>
                                        {classCurrent.endDate}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <span
                                      className="badge bg-warning rounded-3 fw-semibold"
                                      style={{ width: "150px" }}>
                                      {status}
                                    </span>
                                  </td>
                                  <td className="border-bottom-0">
                                    {isShow ? (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleHide()}
                                        style={{
                                          width: "130px",
                                          border: "0",
                                        }}>
                                        Close
                                      </button>
                                    ) : isAttendance[classCurrent.id] ? (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() =>
                                          handleShow(classCurrent.id)
                                        }
                                        style={{
                                          width: "130px",
                                          border: "0",
                                        }}>
                                        Edit Attendance
                                      </button>
                                    ) : (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() =>
                                          handleShow(classCurrent.id)
                                        }
                                        style={{
                                          width: "130px",
                                          border: "0",
                                        }}>
                                        Attendance
                                      </button>
                                    )}
                                  </td>
                                </tr>
                                {isShow && (
                                  <tr>
                                    <td colSpan={7}>
                                      <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                          <tr>
                                            <th className="border-bottom-0">
                                              <h6 className="fw-semibold mb-0">
                                                Id
                                              </h6>
                                            </th>
                                            <th className="border-bottom-0">
                                              <h6 className="fw-semibold mb-0">
                                                Full Name
                                              </h6>
                                            </th>

                                            <th className="border-bottom-0">
                                              <h6 className="fw-semibold mb-0">
                                                Birthday {"(YYYY/MM/DD)"}
                                              </h6>
                                            </th>
                                            <th className="border-bottom-0">
                                              <h6 className="fw-semibold mb-0">
                                                Attendance
                                              </h6>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {enrollmentByClassId &&
                                            enrollmentByClassId.map(
                                              (item, index) => {
                                                let stu = item.account;
                                                let enrollmentId = item.id;
                                                console.log(
                                                  "enrollmentid: ",
                                                  enrollmentId
                                                );
                                                console.log("item ", item);

                                                return (
                                                  <>
                                                    <tr key={stu.id}>
                                                      <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">
                                                          {index + 1}
                                                        </h6>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">
                                                          {stu.fullName}
                                                        </h6>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <span className="mb-0 fw-semibold">
                                                          {stu.birthday}
                                                        </span>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                          <select
                                                            className="form-select m-1"
                                                            value={
                                                              attendanceStatus[
                                                                stu.id
                                                              ]
                                                            }
                                                            style={{
                                                              color:
                                                                attendanceStatus[
                                                                  stu.id
                                                                ] === "absent"
                                                                  ? "red"
                                                                  : "black",
                                                            }}
                                                            onChange={(e) =>
                                                              handleAttendanceChange(
                                                                stu.id,
                                                                e.target.value
                                                              )
                                                            }
                                                            name="attendanceStatus">
                                                            <option
                                                              value="present"
                                                              defaultValue>
                                                              Present
                                                            </option>
                                                            <option
                                                              value="absent"
                                                              style={{
                                                                color: "red",
                                                              }}>
                                                              Absent
                                                            </option>
                                                          </select>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </>
                                                );
                                              }
                                            )}
                                          {enrollmentByClassId && (
                                            <tr>
                                              <td className="border-bottom-0"></td>
                                              <td className="border-bottom-0"></td>
                                              <td className="border-bottom-0"></td>
                                              <td className="border-bottom-0">
                                                {isAttendance[
                                                  classCurrent.id
                                                ] ? (
                                                  <button
                                                    className="badge bg-success rounded-3 fw-semibold"
                                                    onClick={(id) =>
                                                      handleUpdateAttendance(
                                                        classCurrent.id,
                                                        itemSchedule.id
                                                      )
                                                    }
                                                    style={{
                                                      width: "145px",
                                                      border: "0",
                                                      textAlign: "center",
                                                      height: "30px",
                                                    }}>
                                                    Update Attendance
                                                  </button>
                                                ) : (
                                                  <button
                                                    className="badge bg-success rounded-3 fw-semibold"
                                                    onClick={(id) =>
                                                      handleSaveAttendance(
                                                        classCurrent.id,
                                                        itemSchedule.id
                                                      )
                                                    }
                                                    style={{
                                                      width: "145px",
                                                      border: "0",
                                                      textAlign: "center",
                                                      height: "30px",
                                                    }}>
                                                    Send Attendance
                                                  </button>
                                                )}
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                )}
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
        </div>
      </div>
    </div>
  );
};

export default InstructorAttendance;
