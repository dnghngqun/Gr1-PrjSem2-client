import axios from "axios";
import React, { useEffect, useState } from "react";
import NavInstructor from "./NavInstructor";
import SideBarInstructor from "./SideBarInstructor";
const InstructorClass = ({ isLoggedIn, onLogout }) => {
  const [allClass, setAllClass] = useState([]);
  const [classToday, setClassToday] = useState([]);
  const [groupedClasses, setGroupedClasses] = useState({
    notStarted: [],
    started: [],
    completed: [],
    canceled: [],
  });
  const dateToday = new Date();
  const currentDate =
    dateToday.getFullYear() +
    "-" +
    String(dateToday.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateToday.getDate()).padStart(2, "0");

  //const currentDate = "2024-08-08"; //cái này để test cho buổi sau , mấy ngày khác tương tự, có thể xem lịch trong db phần insert schedule

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

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/class/instructor/${isLoggedIn.data.email}`
      )
      .then((res) => {
        setAllClass(res.data.data);
        groupClasses(res.data.data);
      })
      .catch((err) => {
        console.error("Err to fetch class: ", err);
      });
  }, []);

  const groupClasses = (classes) => {
    const grouped = {
      notStarted: [],
      started: [],
      completed: [],
      canceled: [],
    };

    classes.forEach((item) => {
      switch (parseInt(item.status)) {
        case 1:
          grouped.started.push(item);
          break;
        case 2:
          grouped.completed.push(item);
          break;
        case -1:
          grouped.canceled.push(item);
          break;
        default:
          grouped.notStarted.push(item);
          break;
      }
    });

    setGroupedClasses(grouped);
  };

  // hiển thị ra 1 khoá học
  const renderClasses = (classes) => {
    if (classes.length === 0) {
      return (
        <p style={{ color: "gray", fontSize: "15px" }}>
          There are no classes available.
        </p>
      );
    }
    return classes.map((item, index) => (
      <div className="col-lg-6" key={index}>
        <div className="card">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={item.course.imgLink}
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
                  {item.course.name}
                </h2>
                <p className="card-text mb-1" style={{ fontSize: "17px" }}>
                  Study time: {item.location}
                </p>
                <p className="card-text mb-1" style={{ fontSize: "17px" }}>
                  Start Date: {item.startDate}
                </p>
                <p className="card-text mb-1" style={{ fontSize: "17px" }}>
                  End Date: {item.endDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
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
          <h3>Your class today</h3>
          <div className="row">
            {classToday.length === 0 ? (
              <p style={{ color: "gray", fontSize: "15px" }}>
                There are no classes available.
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
          <h3>Started</h3>
          <div className="row">{renderClasses(groupedClasses.started)}</div>
          <h3>Not Started</h3>
          <div className="row">{renderClasses(groupedClasses.notStarted)}</div>
          <h3>Completed</h3>
          <div className="row">{renderClasses(groupedClasses.completed)}</div>
          <h3>Canceled</h3>
          <div className="row">{renderClasses(groupedClasses.canceled)}</div>
        </div>
      </div>
    </div>
  );
};

export default InstructorClass;
