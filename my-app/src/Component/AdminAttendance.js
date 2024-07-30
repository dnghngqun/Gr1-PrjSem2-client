import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import NavAdmin from "./NavAdmin";
import SideBarAdmin from "./sideBarAdmin";
const AdminAttendance = ({ isLoggedIn, onLogout }) => {
  const [allClass, setAllClass] = useState([]);
  const [showWithClassId, setShowWithClassId] = useState(null);
  const [stuInClass, setStuInClass] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
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
      .get("http://localhost:8080/api/v1/class/")
      .then((res) => {
        // Lọc các lớp học có status = 1 hoặc 2
        const filteredClasses = res.data.data.filter(
          (item) => item.status === 1 || item.status === 2
        );
        setAllClass(filteredClasses);
      })
      .catch((err) => {
        console.error("Err to fetch class: ", err);
      });
  }, []);
  const handleShow = (id) => {
    setShowWithClassId(id);
    axios
      .get(`http://localhost:8080/api/v1/enrollments/class/${id}`)
      .then((res) => setStuInClass(res.data.data))
      .catch((err) => {
        notifyFail("No student in class, if error, please check in console!");
        console.log("Error to fetch student: ", err);
        setShowWithClassId(null);
      });
    fetchAttendanceDetails(id);
  };

  const handleHide = () => {
    setShowWithClassId(null);
  };

  const fetchAttendanceDetails = (classId) => {
    axios
      .get(
        `http://localhost:8080/api/v1/attendance/class/${classId}/attendances`
      )
      .then((res) => {
        const formattedAttendanceData = res.data.data.reduce((acc, record) => {
          const { id, enrollment, schedule, attendanceStatus } = record;
          const { account } = enrollment;

          if (!acc[account.id]) {
            acc[account.id] = [];
          }

          acc[account.id].push({
            lessonNumber: schedule.lessonNumber,
            classDate: schedule.classDate,
            attendanceStatus: attendanceStatus,
          });

          return acc;
        }, {});

        setAttendances(formattedAttendanceData);
      })
      .catch((err) => {
        console.log("Error fetching attendance details");
        console.error(err);
      });
  };

  const handleClickDetails = (id) => {
    setSelectedStudentId(id);
  };

  const handleHideDetails = () => {
    setSelectedStudentId(null);
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
      <SideBarAdmin onLogout={onLogout} />

      {/* right */}
      <div className="body-wrapper">
        {/* header */}
        <NavAdmin isLoggedIn={isLoggedIn} />
        {/* body */}
        <div
          className="container-fluid"
          style={{ maxWidth: "100%", paddingLeft: "0", paddingRight: "0" }}>
          <div className="row">
            <div className="col-lg-12 d-flex align-items-stretch">
              <div className="card w-100">
                <div className="card-body p-4">
                  <h5 className="card-title fw-semibold mb-4">
                    {" "}
                    View Attendance
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
                        {allClass &&
                          allClass.map((item, index) => {
                            let classStatus = "Not Started";
                            if (parseInt(item.status) === 2)
                              classStatus = "Completed";
                            if (parseInt(item.status) === 1)
                              classStatus = "Started";

                            const isShowStu = showWithClassId === item.id;
                            return (
                              <>
                                <tr>
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
                                    <span
                                      className="badge bg-secondary rounded-3 fw-semibold"
                                      style={{ width: "90px" }}>
                                      {item.location}
                                    </span>
                                  </td>
                                  <td className="border-bottom-0">
                                    {" "}
                                    <span
                                      className="badge bg-secondary rounded-3 fw-semibold"
                                      style={{ width: "100px" }}>
                                      {item.startDate}
                                    </span>
                                  </td>
                                  <td className="border-bottom-0">
                                    {" "}
                                    <span
                                      className="badge bg-secondary rounded-3 fw-semibold"
                                      style={{ width: "100px" }}>
                                      {item.endDate}
                                    </span>
                                  </td>
                                  <td className="border-bottom-0">
                                    {" "}
                                    <h6
                                      className="fw-semibold mb-0 fs-4"
                                      style={{ width: "100px" }}>
                                      {classStatus}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    {item.status === 1 || item.status === 2 ? (
                                      <>
                                        {isShowStu ? (
                                          <button
                                            className="badge bg-success rounded-3 fw-semibold"
                                            onClick={() => handleHide()}
                                            style={{
                                              width: "130px",
                                              border: "0",
                                            }}>
                                            close
                                          </button>
                                        ) : (
                                          <button
                                            className="badge bg-success rounded-3 fw-semibold"
                                            onClick={() => handleShow(item.id)}
                                            style={{
                                              width: "130px",
                                              border: "0",
                                            }}>
                                            Show Student
                                          </button>
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                </tr>
                                {isShowStu && (
                                  <tr
                                    className={`fade-in ${
                                      isShowStu ? "show" : "hide"
                                    }`}>
                                    <td colSpan={7}>
                                      <h6 className="fw-semibold mb-0">
                                        Total Student: {stuInClass.length}
                                      </h6>
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
                                                Avatar
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
                                                Number of days present
                                              </h6>
                                            </th>
                                            <th className="border-bottom-0">
                                              <h6 className="fw-semibold mb-0">
                                                Number of days absent
                                              </h6>
                                            </th>
                                            <th className="border-bottom-0"></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {stuInClass.map((item, index) => {
                                            let user = item.account;
                                            let attendanceRecords =
                                              attendances[user.id] || [];

                                            const presentCount =
                                              attendanceRecords.filter(
                                                (record) =>
                                                  record.attendanceStatus ===
                                                  "present"
                                              ).length;
                                            const absentCount =
                                              attendanceRecords.filter(
                                                (record) =>
                                                  record.attendanceStatus ===
                                                  "absent"
                                              ).length;
                                            console.log(attendanceRecords);
                                            console.log(
                                              "Present Count:",
                                              presentCount
                                            );
                                            console.log(
                                              "Absent Count:",
                                              absentCount
                                            );

                                            return (
                                              <>
                                                <tr key={item.id}>
                                                  <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">
                                                      {index + 1}
                                                    </h6>
                                                  </td>
                                                  <td className="border-bottom-0">
                                                    <img
                                                      src={user.imageAccount}
                                                      alt=""
                                                      className="rounded-circle offset-1"
                                                      style={{
                                                        objectFit: "cover",
                                                      }}
                                                      width="30px"
                                                      height="30px"
                                                    />
                                                  </td>
                                                  <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">
                                                      {user.fullName}
                                                    </h6>
                                                  </td>
                                                  <td className="border-bottom-0">
                                                    <span className="mb-1 fw-semibold">
                                                      {user.email}
                                                    </span>
                                                  </td>
                                                  <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                      <span className="fw-semibold">
                                                        {presentCount}
                                                      </span>
                                                    </div>
                                                  </td>
                                                  <td className="border-bottom-0">
                                                    <span className="fw-semibold mb-0 fs-4">
                                                      {absentCount}
                                                    </span>
                                                  </td>
                                                  <td className="border-bottom-0">
                                                    {selectedStudentId ===
                                                    user.id ? (
                                                      <button
                                                        className="badge bg-success rounded-3 fw-semibold border-0 "
                                                        onClick={
                                                          handleHideDetails
                                                        }
                                                        style={{
                                                          width: "100px",
                                                        }}>
                                                        Hide
                                                      </button>
                                                    ) : (
                                                      <button
                                                        className="badge bg-success rounded-3 fw-semibold border-0 "
                                                        onClick={() =>
                                                          handleClickDetails(
                                                            user.id
                                                          )
                                                        }
                                                        style={{
                                                          width: "100px",
                                                        }}>
                                                        Details
                                                      </button>
                                                    )}
                                                  </td>
                                                </tr>
                                                {selectedStudentId ===
                                                  user.id &&
                                                  attendances[
                                                    selectedStudentId
                                                  ] && (
                                                    <>
                                                      <tr
                                                        className={`fade-in ${
                                                          selectedStudentId
                                                            ? "show"
                                                            : "hide"
                                                        }`}>
                                                        <td colSpan={7}>
                                                          <table className="table text-nowrap mb-0 align-middle">
                                                            <thead className="text-dark fs-4">
                                                              <tr>
                                                                <th className="border-bottom-0">
                                                                  <h6 className="fw-semibold mb-0">
                                                                    Lesson
                                                                    Number
                                                                  </h6>
                                                                </th>
                                                                <th className="border-bottom-0">
                                                                  <h6 className="fw-semibold mb-0">
                                                                    Class Date
                                                                  </h6>
                                                                </th>
                                                                <th className="border-bottom-0">
                                                                  <h6 className="fw-semibold mb-0">
                                                                    Attendance
                                                                    Status
                                                                  </h6>
                                                                </th>
                                                              </tr>
                                                            </thead>
                                                            <tbody>
                                                              {attendances[
                                                                selectedStudentId
                                                              ].map(
                                                                (
                                                                  attendance,
                                                                  index
                                                                ) => (
                                                                  <tr
                                                                    key={index}>
                                                                    <td className="border-bottom-0">
                                                                      <h6 className="fw-semibold mb-0">
                                                                        {
                                                                          attendance.lessonNumber
                                                                        }
                                                                      </h6>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                      <h6 className="fw-semibold mb-0">
                                                                        {
                                                                          attendance.classDate
                                                                        }
                                                                      </h6>
                                                                    </td>
                                                                    <td className="border-bottom-0">
                                                                      <h6 className="fw-semibold mb-0">
                                                                        {
                                                                          attendance.attendanceStatus
                                                                        }
                                                                      </h6>
                                                                    </td>
                                                                  </tr>
                                                                )
                                                              )}
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </>
                                                  )}
                                              </>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
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

export default AdminAttendance;
