import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import NavStaff from "./NavStaff";
import SideBarStaff from "./sideBarStaff";
const StaffAttendance = ({ isLoggedIn, onLogout }) => {
  const [classStarted, setClassStarted] = useState([]);
  const [isShowWithId, setIsShowWithId] = useState(null);
  const [enrollmentByClassId, setEnrollmentByClassId] = useState([]);
  const [showAttendance, setShowAttendance] = useState(null);
  const [valueAttendance, setValueAttendance] = useState({});
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/class/status/started")
      .then((res) => setClassStarted(res.data.data))
      .catch((err) => console.error("Error to fetch class started: ", err));
  }, []);

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
  };

  const handleHide = () => {
    setIsShowWithId(null);
  };
  const handleShowAttendance = (id) => {
    setShowAttendance(id);
  };

  const handleSentAttendance = (id) => {
    const sentAttendance = {
      ...valueAttendance,
      enrollment: { id: id },
    };

    let isSent = true;

    if (
      sentAttendance.lessonNumber === "" ||
      sentAttendance.lessonNumber == null
    ) {
      notifyFail("Lesson Number is required!");
      isSent = false;
    }
    if (
      sentAttendance.attendanceStatus === "" ||
      sentAttendance.attendanceStatus == null
    ) {
      notifyFail("Status is required!");
      isSent = false;
    }
    if (isSent) {
      axios
        .post("http://localhost:8080/api/v1/attendance/add", sentAttendance)
        .then((res) => {
          console.log("Sent attendance successfully! ", res);
          notify("Attendance successful!");
        })
        .catch((err) => {
          console.log("Error to attendance: ", err);
          notifyFail("Error to attendance, please check error in the console!");
        });
    }
  };
  const handleHideAttendance = () => {
    setShowAttendance(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueAttendance((prevValue) => ({ ...prevValue, [name]: value }));
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
      <SideBarStaff onLogout={onLogout} />

      {/* right */}
      <div className="body-wrapper">
        {/* header */}
        <NavStaff isLoggedIn={isLoggedIn} />
        {/* body */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 d-flex align-items-stretch">
              <div className="card w-100">
                <div className="card-body p-4">
                  <h5 className="card-title fw-semibold mb-4">Attendance</h5>
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
                            <h6 className="fw-semibold mb-0">Instructor</h6>
                          </th>
                          <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Study Time</h6>
                          </th>
                          <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">Start Date</h6>
                          </th>
                          <th className="border-bottom-0">
                            <h6 className="fw-semibold mb-0">End Date</h6>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {classStarted &&
                          classStarted.map((item, index) => {
                            let isShow = isShowWithId === item.id;
                            return (
                              <>
                                <tr key={item.id}>
                                  <td className="border-bottom-0">
                                    <h6 className="fw-semibold mb-0">
                                      {index + 1}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <h6
                                      className="fw-semibold mb-0"
                                      style={{ width: "100px" }}>
                                      {item.course.name}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <p
                                      className="mb-0 fw-normal"
                                      style={{ width: "100px" }}>
                                      {item.instructor.name}
                                    </p>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <span
                                        className="badge bg-secondary rounded-3 fw-semibold"
                                        style={{ width: "90px" }}>
                                        {item.location}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <span
                                      className="badge bg-secondary rounded-3 fw-semibold"
                                      style={{ width: "100px" }}>
                                      {item.startDate}
                                    </span>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <span
                                        className="badge bg-secondary rounded-3 fw-semibold"
                                        style={{ width: "100px" }}>
                                        {item.endDate}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    {isShow ? (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleHide()}
                                        style={{
                                          width: "153px",
                                        }}>
                                        Hide Student
                                      </button>
                                    ) : (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleShow(item.id)}
                                        style={{
                                          width: "153px",
                                        }}>
                                        Show Student
                                      </button>
                                    )}
                                  </td>
                                </tr>
                                {isShow ? (
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
                                                Email
                                              </h6>
                                            </th>
                                            <th className="border-bottom-0">
                                              <h6 className="fw-semibold mb-0">
                                                Phone Number
                                              </h6>
                                            </th>
                                            <th className="border-bottom-0">
                                              <h6 className="fw-semibold mb-0">
                                                Birthday {"(YYYY/MM/DD)"}
                                              </h6>
                                            </th>
                                            <th className="border-bottom-0"></th>
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
                                                let isShowAttendance =
                                                  showAttendance === stu.id;
                                                return (
                                                  <>
                                                    <tr key={stu.id}>
                                                      <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-0">
                                                          {stu.id}
                                                        </h6>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <h6 className="fw-semibold mb-1">
                                                          {stu.fullName}
                                                        </h6>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <span className="mb-1 fw-semibold">
                                                          {stu.email}
                                                        </span>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <div className="d-flex align-items-center gap-2">
                                                          <span className="fw-semibold">
                                                            {stu.phoneNumber}
                                                          </span>
                                                        </div>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <span className="fw-semibold mb-0 fs-4">
                                                          {stu.birthday}
                                                        </span>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        {isShowAttendance ? (
                                                          <button
                                                            className="badge bg-warning rounded-3 fw-semibold"
                                                            onClick={() =>
                                                              handleHideAttendance()
                                                            }
                                                            style={{
                                                              width: "100px",
                                                            }}>
                                                            Close
                                                          </button>
                                                        ) : (
                                                          <button
                                                            className="badge bg-warning rounded-3 fw-semibold"
                                                            onClick={() =>
                                                              handleShowAttendance(
                                                                stu.id
                                                              )
                                                            }
                                                            style={{
                                                              width: "100px",
                                                            }}>
                                                            Attendance
                                                          </button>
                                                        )}
                                                      </td>
                                                    </tr>
                                                    {isShowAttendance ? (
                                                      <tr>
                                                        <td colSpan={6}>
                                                          <div className="w-100 d-xl-flex align-items-center justify-content-sm-center">
                                                            <input
                                                              type="number"
                                                              min="1"
                                                              max="100"
                                                              className="form-control m-1"
                                                              placeholder="Choose lession"
                                                              name="lessonNumber"
                                                              onChange={
                                                                handleChange
                                                              }
                                                            />
                                                            <select
                                                              className="form-select m-1"
                                                              name="attendanceStatus"
                                                              onChange={
                                                                handleChange
                                                              }>
                                                              <option value="">
                                                                Select
                                                                attendance
                                                              </option>
                                                              <option value="present">
                                                                Present
                                                              </option>
                                                              <option value="absent">
                                                                Absent
                                                              </option>
                                                            </select>
                                                            <button
                                                              className="badge bg-warning rounded-3 fw-semibold"
                                                              style={{
                                                                width: "60px",
                                                              }}
                                                              onClick={() =>
                                                                handleSentAttendance(
                                                                  enrollmentId
                                                                )
                                                              }>
                                                              Sent
                                                            </button>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </>
                                                );
                                              }
                                            )}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                ) : (
                                  <></>
                                )}
                              </>
                            );
                          })}
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

export default StaffAttendance;
