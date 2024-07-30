import React, { useEffect, useState } from "react";
// import "./Css/Staff.css";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import NavAdmin from "./NavAdmin";
import SideBarAdmin from "./sideBarAdmin";
const AdminInstructor = ({ isLoggedIn, onLogout }) => {
  const [instructor, setIntructor] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [editingClassId, setEditingClassId] = useState(null);
  const [editingValues, setEditingValues] = useState({});
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowClass, setIsShowClass] = useState(null);
  const [classShow, setClassShow] = useState([]);
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    bio: "",
    classify: "",
  });
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); //để tìm kiếm

  const filteredInstructors = instructor.filter((item) =>
    [item.name, item.email, item.phoneNumber, item.classify].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
      .get("http://localhost:8080/api/v1/instructors")
      .then((res) => {
        setIntructor(res.data);
        console.log("Get Instructor success!");
      })
      .catch((err) => {
        console.log("Err to fetch instructor: ", err);
      });
  }, [shouldFetch]);
  const handleSave = (email) => {
    setEditingClassId(null);
    const updatedInfo = {
      ...editingValues, //copy thành 1 object mới
    };

    axios
      .put(
        `http://localhost:8080/api/v1/instructors/email/${email}`,
        updatedInfo
      )
      .then((res) => {
        notify("Update Information Successfully!");
        setShouldFetch((value) => !value);
      })
      .catch((err) => {
        notifyFail(
          "Error to update information, please check error in the console!"
        );
        console.error("Error to update account: ", err);
      });
  };

  const handleEdit = (id) => {
    setEditingClassId(id);
    const item = instructor.find((ins) => ins.id === id);
    setEditingValues({
      name: item.name,
      bio: item.bio,
      email: item.email,
      gender: item.gender,
      phoneNumber: item.phoneNumber,
      classify: item.classify,
    });
  };

  const handleDeleteClass = (email) => {
    Swal.fire({
      icon: "warning",
      title: "Do you want to delete this instructor?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/v1/instructors/${email}`)
          .then((res) => {
            notify("Delete instructor successfully!");
            setShouldFetch((value) => !value);
          })
          .catch((err) => {
            notifyFail("Error to delete, please check error in the console!");
            console.error("Error to delete: ", err);
          });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const [isVisible, setIsVisible] = useState(false);

  const handleCreate = () => {
    if (isVisible) {
      // Delay hiding the form to allow CSS transition to finish
      setTimeout(() => setIsShowCreate(false), 1000);
    } else {
      setIsShowCreate(true);
    }
    setIsVisible((value) => !value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNewInstructorChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSaveNewInstructor = () => {
    if (
      !newInstructor.name.trim() ||
      !newInstructor.email.trim() ||
      !newInstructor.phoneNumber.trim() ||
      !newInstructor.gender.trim() ||
      !newInstructor.bio.trim() ||
      !image ||
      !newInstructor.classify.trim
    ) {
      notifyFail("Please fill in all the fields and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append(
      "instructor",
      new Blob([JSON.stringify(newInstructor)], { type: "application/json" })
    );
    notify("Please wait...");

    axios
      .post("http://localhost:8080/api/v1/instructors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        notify("Create new instructor successfully!");
        setShouldFetch((value) => !value);
        setIsShowCreate(false);
        setNewInstructor({
          name: "",
          email: "",
          phoneNumber: "",
          gender: "",
          bio: "",
          classify: "",
        });
        setImage(null);
      })
      .catch((err) => {
        notifyFail(
          "Error to create new account, please check error in the console!"
        );
        console.error("Error to create new account: ", err);
      });
  };

  const handleShowClass = (id, email) => {
    setIsShowClass(id);

    axios
      .get(`http://localhost:8080/api/v1/class/instructor/${email}`)
      .then((res) => {
        setClassShow(res.data.data);
      })
      .catch((err) => {
        console.error("Err to fetch class by instructor: ", err);
        notifyFail("The instructor is not teaching any classes at the moment!");
        setIsShowClass(null);
        setClassShow([]);
      });
  };
  const handleCloseShowClass = () => {
    setIsShowClass(null);
  };
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
                    <h5 className="card-title fw-semibold mb-1">
                      ALl Intructors
                    </h5>
                    {isShowCreate ? (
                      <button
                        style={{ border: "0", height: "30px" }}
                        className="badge bg-dark rounded-3 fw-semibold mb-2"
                        onClick={handleCreate}>
                        Close
                      </button>
                    ) : (
                      <button
                        style={{ border: "0", height: "30px" }}
                        className="badge bg-dark rounded-3 fw-semibold mb-2"
                        onClick={handleCreate}>
                        Create new instructor
                      </button>
                    )}

                    {isShowCreate && (
                      <div className={`fade-in ${isVisible ? "show" : "hide"}`}>
                        <input
                          type="text"
                          name="name"
                          placeholder="name"
                          value={newInstructor.name}
                          onChange={handleNewInstructorChange}
                          className="form-control mb-2"
                        />

                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={newInstructor.email}
                          onChange={handleNewInstructorChange}
                          className="form-control mb-2"
                        />
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={newInstructor.phoneNumber}
                          onChange={handleNewInstructorChange}
                          className="form-control mb-2"
                        />
                        <select
                          name="gender"
                          value={newInstructor.gender}
                          onChange={handleNewInstructorChange}
                          className="form-control mb-2">
                          <option value="">Select gender</option>
                          <option value="male">male</option>
                          <option value="female">female</option>
                          <option value="other">other</option>
                        </select>

                        <select
                          name="classify"
                          value={newInstructor.classify}
                          onChange={handleNewInstructorChange}
                          className="form-control mb-2">
                          <option value="">Select Classify</option>
                          <option value="IELTS">IELTS</option>
                          <option value="TOEIC">TOEIC</option>
                        </select>

                        <textarea
                          name="bio"
                          placeholder="Bio"
                          value={newInstructor.bio}
                          onChange={handleNewInstructorChange}
                          className="form-control mb-2"
                        />

                        <input
                          type="file"
                          name="image"
                          onChange={handleImageChange}
                          className="form-control mb-2"
                        />
                        <button
                          className="btn btn-success"
                          onClick={handleSaveNewInstructor}>
                          Save
                        </button>
                      </div>
                    )}
                    {/* Thêm input tìm kiếm */}
                    <input
                      type="text"
                      placeholder="Search by name, email, phone number or classify"
                      className="form-control mb-3"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="table-responsive">
                      <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                          <tr>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Id</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Image</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Name</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Gender</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Email</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Classify</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Phone Number</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Bio</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Class</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Action</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInstructors.map((item, index) => {
                            const isEditing = editingClassId === item.id;
                            const isShowC = isShowClass === item.id;
                            return (
                              <>
                                <tr key={index}>
                                  <td className="border-bottom-0">
                                    <h6 className="fw-semibold mb-0">
                                      {index + 1}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    <img
                                      src={item.imageLink}
                                      alt=""
                                      className="offset-1"
                                      style={{
                                        objectFit: "cover",
                                      }}
                                      width="40px"
                                      height="40px"
                                    />
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={editingValues.name}
                                        onChange={handleChange}
                                        style={{ width: "120px" }}
                                      />
                                    ) : (
                                      <h6
                                        className="fw-semibold text-wrap mb-0"
                                        style={{ width: "120px" }}>
                                        {item.name}
                                      </h6>
                                    )}
                                  </td>{" "}
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <select
                                        name="gender"
                                        value={editingValues.gender}
                                        onChange={handleChange}
                                        style={{ width: "70px" }}>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="other">other</option>
                                      </select>
                                    ) : (
                                      <h6
                                        className="fw-semibold text-wrap mb-0"
                                        style={{ width: "70px" }}>
                                        {item.gender}
                                      </h6>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <input
                                        type="email"
                                        onChange={handleChange}
                                        name="email"
                                        value={editingValues.email}
                                        style={{ width: "210px" }}
                                      />
                                    ) : (
                                      <h6
                                        className="fw-semibold text-wrap mb-0"
                                        style={{ width: "210px" }}>
                                        {item.email}
                                      </h6>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      {isEditing ? (
                                        <select
                                          name="classify"
                                          value={editingValues.classify}
                                          onChange={handleChange}
                                          style={{ width: "70px" }}>
                                          <option value="IELTS">IELTS</option>
                                          <option value="TOEIC">TOEIC</option>
                                        </select>
                                      ) : (
                                        <h6
                                          className="fw-semibold text-wrap mb-0"
                                          style={{ width: "70px" }}>
                                          {item.classify}
                                        </h6>
                                      )}
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={editingValues.phoneNumber}
                                        onChange={handleChange}
                                        style={{ width: "100px" }}
                                      />
                                    ) : (
                                      <h6
                                        className="fw-semibold mb-0"
                                        style={{ width: "100px" }}>
                                        {item.phoneNumber}
                                      </h6>
                                    )}
                                  </td>{" "}
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <textarea
                                        name="bio"
                                        placeholder="Bio"
                                        value={editingValues.bio}
                                        onChange={handleChange}
                                        style={{ width: "170px" }}
                                      />
                                    ) : (
                                      <h6
                                        className="fw-semibold text-wrap mb-0"
                                        style={{ width: "170px" }}>
                                        {item.bio}
                                      </h6>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    {isShowC ? (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleCloseShowClass()}
                                        style={{
                                          width: "55px",
                                          border: "0",
                                        }}>
                                        Close
                                      </button>
                                    ) : (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() =>
                                          handleShowClass(item.id, item.email)
                                        }
                                        style={{
                                          width: "55px",
                                          border: "0",
                                        }}>
                                        View
                                      </button>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleSave(item.email)}
                                        style={{
                                          width: "55px",
                                          border: "0",
                                        }}>
                                        Save
                                      </button>
                                    ) : (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleEdit(item.id)}
                                        style={{
                                          width: "55px",
                                          border: "0",
                                        }}>
                                        Edit
                                      </button>
                                    )}
                                    <button
                                      className="badge bg-danger rounded-3 fw-semibold"
                                      onClick={() =>
                                        handleDeleteClass(item.email)
                                      }
                                      style={{
                                        marginLeft: "10px",
                                        width: "70px",
                                        border: "0",
                                      }}>
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                                {isShowC && (
                                  <>
                                    <tr>
                                      <td
                                        className="border-bottom-0"
                                        colSpan={10}>
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
                                                  Name
                                                </h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Study Time
                                                </h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Start Date
                                                </h6>
                                              </th>
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  End Date
                                                </h6>
                                              </th>{" "}
                                              <th className="border-bottom-0">
                                                <h6 className="fw-semibold mb-0">
                                                  Status
                                                </h6>
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {classShow &&
                                              classShow.map((item, index) => {
                                                let classStatus = "Not Started";
                                                if (parseInt(item.status) === 2)
                                                  classStatus = "Completed";
                                                if (parseInt(item.status) === 1)
                                                  classStatus = "Started";

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
                                                          style={{
                                                            width: "100px",
                                                          }}>
                                                          {item.course.name}
                                                        </h6>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        <span
                                                          className="badge bg-secondary rounded-3 fw-semibold"
                                                          style={{
                                                            width: "90px",
                                                          }}>
                                                          {item.location}
                                                        </span>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        {" "}
                                                        <span
                                                          className="badge bg-secondary rounded-3 fw-semibold"
                                                          style={{
                                                            width: "100px",
                                                          }}>
                                                          {item.startDate}
                                                        </span>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        {" "}
                                                        <span
                                                          className="badge bg-secondary rounded-3 fw-semibold"
                                                          style={{
                                                            width: "100px",
                                                          }}>
                                                          {item.endDate}
                                                        </span>
                                                      </td>
                                                      <td className="border-bottom-0">
                                                        {" "}
                                                        <h6
                                                          className="fw-semibold mb-0 fs-4"
                                                          style={{
                                                            width: "100px",
                                                          }}>
                                                          {classStatus}
                                                        </h6>
                                                      </td>
                                                    </tr>
                                                  </>
                                                );
                                              })}
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

export default AdminInstructor;
