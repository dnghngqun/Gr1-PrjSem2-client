import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Css/InstrucCs.css";
import "./Css/Instructor.css";
import NavInstructor from "./NavInstructor";
import SideBarInstructor from "./SideBarInstructor";
const Instructor = ({ isLoggedIn, onLogout }) => {
  const [instructor, setInstructor] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/instructors/email/${isLoggedIn.data.email}`
      )
      .then((res) => {
        setInstructor(res.data);
      });
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
        <SideBarInstructor onLogout={onLogout} />

        {/* right */}
        <div className="body-wrapper">
          {/* header */}
          <NavInstructor isLoggedIn={isLoggedIn} />
          {/* body */}
          <div className="container-fluid">
            <div className="row">
              <div class="col-12 col-lg-12 mb-0">
                <div class="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div class="row g-0" style={{ height: "80vh" }}>
                    <div
                      class="col-md-4 gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                        margin: "auto",
                      }}>
                      <img
                        src={instructor.imageLink}
                        alt="Avatar"
                        class="img-fluid my-3 rounded-circle img-instructor"
                      />
                      <h5 className="instruc-name">{instructor.name}</h5>
                      <span className="instruc-classify">
                        {instructor.classify}
                      </span>
                    </div>
                    <div class="col-md-8" style={{ margin: "auto " }}>
                      <div class="card-body p-4">
                        <h6 className="infor-title">Information</h6>
                        <hr class="mt-0 mb-4" />
                        <div class="row pt-1">
                          <div class="col-6 mb-3">
                            <h6 className="info-child-title">Email</h6>
                            <p class="text-muted info-child-item">
                              {instructor.email}
                            </p>
                          </div>
                          <div class="col-6 mb-3">
                            <h6 className="info-child-title">Phone</h6>
                            <p class="text-muted info-child-item">
                              {instructor.phoneNumber}
                            </p>
                          </div>
                          <div class="col-6 mb-3">
                            <h6 className="info-child-title">Gender</h6>
                            <p class="text-muted info-child-item">
                              {instructor.gender}
                            </p>
                          </div>
                        </div>

                        <h6 className="mb-0 info-child-title">Bio</h6>
                        <hr class="mt-0 mb-3" />

                        <div class="row pt-0">
                          <div class="">
                            <p class="text-muted info-child-item">
                              {instructor.bio}
                            </p>
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
      </div>
    </div>
  );
};

export default Instructor;
