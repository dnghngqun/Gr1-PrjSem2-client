import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/Staff.css";
import NavStaff from "./NavStaff";
import SideBarStaff from "./sideBarStaff";
const StaffStudent = ({ onLogout }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/accounts/students")
      .then((res) => setStudents(res.data.data))
      .catch((err) => console.error("Error to fetch student: ", err));
  }, []);
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
        <SideBarStaff onLogout={onLogout} />

        {/* right */}
        <div className="body-wrapper">
          {/* header */}
          <NavStaff />
          {/* body */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">
                      All Students
                    </h5>
                    <div className="table-responsive">
                      <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                          <tr>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Id</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Full Name</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Email</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Phone Number</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">
                                Birthday {"(YYYY/MM/DD)"}
                              </h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((item, index) => {
                            return (
                              <tr>
                                <td className="border-bottom-0">
                                  <h6 className="fw-semibold mb-0">
                                    {index + 1}
                                  </h6>
                                </td>
                                <td className="border-bottom-0">
                                  <h6 className="fw-semibold mb-1">
                                    {item.fullName}
                                  </h6>
                                </td>
                                <td className="border-bottom-0">
                                  <span className="mb-1 fw-semibold">
                                    {item.email}
                                  </span>
                                </td>
                                <td className="border-bottom-0">
                                  <div className="d-flex align-items-center gap-2">
                                    <span className="fw-semibold">
                                      {item.phoneNumber}
                                    </span>
                                  </div>
                                </td>
                                <td className="border-bottom-0">
                                  <span className="fw-semibold mb-0 fs-4">
                                    {item.birthday}
                                  </span>
                                </td>
                              </tr>
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
    </div>
  );
};

export default StaffStudent;
