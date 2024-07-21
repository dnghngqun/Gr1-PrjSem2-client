import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import "./Css/Staff.css";
import NavStaff from "./NavStaff";
import SideBarStaff from "./sideBarStaff";
const StaffClass = ({ isLoggedIn, onLogout }) => {
  const [allClass, setAllClass] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [course, setCourse] = useState([]);
  const [editingClassId, setEditingClassId] = useState(null);
  const [editingValues, setEditingValues] = useState({});
  const [shouldFetchClasses, setShouldFetchClasses] = useState(false);

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

  const handleEdit = (classId) => {
    setEditingClassId(classId);
    const item = allClass.find((cls) => cls.id === classId);
    setEditingValues({
      course: item.course.id,
      instructor: item.instructor.id,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status,
    });
  };

  const handleSave = (id) => {
    setEditingClassId(null);
    const updatedClass = {
      ...editingValues, //copy thành 1 object mới, và các giá trị bên dưới kiểu ghi đè ý
      course: { id: editingValues.course },
      instructor: { id: editingValues.instructor },
      status: parseInt(editingValues.status),
    };

    console.log(updatedClass);

    axios
      .put(`http://localhost:8080/api/v1/class/${id}`, updatedClass)
      .then((res) => {
        notify("Update Information Class Successfully!");
        setShouldFetchClasses((value) => !value);
      })
      .catch((err) => {
        notifyFail(
          "Error to update information, please check error in the console!"
        );
        console.log("Error to update class: ", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target; //trích xuất các thuộc tính name và value từ đối tượng e.target
    //name là tên của trường đầu vào (input, select, v.v.), đặt qua thuộc tính name
    setEditingValues((prevValues) => ({ ...prevValues, [name]: value }));
    //prevValues -> giá trị htại của editingValues
    //...prevValues: copy giá trị htại và tạo ra object mới,
    //[name]:value  -> tương ứng key value, dùng [name] thì tên name = key truyền vào là thuộc tính name của trường mình đặt
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/class/")
      .then((res) => {
        setAllClass(res.data.data);
      })
      .catch((err) => console.error("Err to fetching all class: ", err));
  }, [shouldFetchClasses]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/instructors")
      .then((res) => setInstructor(res.data))
      .catch((err) => console.error("Error to fetch instructor: ", err));

    axios
      .get("http://localhost:8080/api/v1/courses")
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error to fetch course: ", err));
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
          <NavStaff isLoggedIn={isLoggedIn} />
          {/* body */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">
                      All grades available
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
                              if (parseInt(item.status) === 1)
                                classStatus = "Completed";
                              if (parseInt(item.status) === -1)
                                classStatus = "Canceled";
                              const isEditing = editingClassId === item.id;
                              return (
                                <tr>
                                  <td className="border-bottom-0">
                                    <h6 className="fw-semibold mb-0">
                                      {index + 1}
                                    </h6>
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <select
                                        name="course"
                                        onChange={handleChange}
                                        style={{ width: "100px" }}
                                        value={editingValues.course}>
                                        {course &&
                                          course.map((item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}>
                                                {item.name}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    ) : (
                                      <h6
                                        className="fw-semibold mb-0"
                                        style={{ width: "100px" }}>
                                        {item.course.name}
                                      </h6>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <select
                                        name="instructor"
                                        onChange={handleChange}
                                        style={{ width: "100px" }}
                                        value={editingValues.instructor}>
                                        {instructor &&
                                          instructor.map((item, index) => {
                                            return (
                                              <option
                                                key={index}
                                                value={item.id}>
                                                {item.name}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    ) : (
                                      <p
                                        className="mb-0 fw-normal"
                                        style={{ width: "100px" }}>
                                        {item.instructor.name}
                                      </p>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      {isEditing ? (
                                        <select
                                          name="location"
                                          onChange={handleChange}
                                          style={{ width: "90px" }}
                                          value={editingValues.location}>
                                          <option value="8h30-10h">
                                            8h30-10h
                                          </option>
                                          <option value="9h30-11h">
                                            9h30-11h
                                          </option>
                                          <option value="13h30-15h">
                                            13h30-15h
                                          </option>
                                          <option value="14h-15h30">
                                            14h-15h30
                                          </option>
                                          <option value="16h-17h30">
                                            16h-17h30
                                          </option>
                                          <option value="18h-19h30">
                                            18h-19h30
                                          </option>
                                          <option value="19h30-21h">
                                            19h30-21h
                                          </option>
                                          <option value="20h-21h30">
                                            20h-21h30
                                          </option>
                                        </select>
                                      ) : (
                                        <span
                                          className="badge bg-secondary rounded-3 fw-semibold"
                                          style={{ width: "90px" }}>
                                          {item.location}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      {isEditing ? (
                                        <input
                                          type="date"
                                          name="startDate"
                                          onChange={handleChange}
                                          value={editingValues.startDate}
                                          style={{ width: "100px" }}
                                        />
                                      ) : (
                                        <span
                                          className="badge bg-secondary rounded-3 fw-semibold"
                                          style={{ width: "100px" }}>
                                          {item.startDate}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    <div className="d-flex align-items-center gap-2">
                                      {isEditing ? (
                                        <input
                                          type="date"
                                          name="endDate"
                                          onChange={handleChange}
                                          value={editingValues.endDate}
                                          style={{ width: "100px" }}
                                        />
                                      ) : (
                                        <span
                                          className="badge bg-secondary rounded-3 fw-semibold"
                                          style={{ width: "100px" }}>
                                          {item.endDate}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <select
                                        name="status"
                                        onChange={handleChange}
                                        value={editingValues.status}
                                        style={{ width: "100px" }}>
                                        <option value="-1">Canceled</option>
                                        <option value="0">Not Started</option>
                                        <option value="1">Completed</option>
                                      </select>
                                    ) : (
                                      <h6
                                        className="fw-semibold mb-0 fs-4"
                                        style={{ width: "100px" }}>
                                        {classStatus}
                                      </h6>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleSave(item.id)}
                                        style={{
                                          width: "55px",
                                        }}>
                                        Save
                                      </button>
                                    ) : (
                                      <button
                                        className="badge bg-success rounded-3 fw-semibold"
                                        onClick={() => handleEdit(item.id)}
                                        style={{
                                          width: "55px",
                                        }}>
                                        Edit
                                      </button>
                                    )}
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

export default StaffClass;
