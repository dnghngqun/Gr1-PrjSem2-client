import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import NavAdmin from "./NavAdmin";
import SideBarAdmin from "./sideBarAdmin";
const AdminAccountStudent = ({ isLoggedIn, onLogout }) => {
  const [accounts, setAccounts] = useState([]);
  const [editingClassId, setEditingClassId] = useState(null);
  const [editingValues, setEditingValues] = useState({});
  const [shouldFetchClasses, setShouldFetchClasses] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); //để tìm kiếm

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/accounts/students")
      .then((res) => {
        setAccounts(res.data.data);
        console.log("Get Student success!");
      })
      .catch((err) => {
        console.log("Err to fetch student: ", err);
      });
  }, [shouldFetchClasses]);

  const filteredAccounts = accounts.filter((item) =>
    [item.userName, item.email, item.phoneNumber, item.fullName].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  //get ALl Student

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

  const handleSave = (id) => {
    setEditingClassId(null);

    const updatedInfo = {
      ...editingValues, //copy thành 1 object mới
    };

    axios
      .put(
        `http://localhost:8080/api/v1/accounts/admin/updateInformation/${id}`,
        updatedInfo
      )
      .then((res) => {
        notify("Update Information Successfully!");
        setShouldFetchClasses((value) => !value);
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
    const item = accounts.find((acc) => acc.id === id);
    setEditingValues({
      password: "",
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      birthday: item.birthday,
    });
  };

  const handleDeleteClass = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Do you want to delete this account?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/v1/accounts/delete/${id}`)
          .then((res) => {
            notify("Delete account successfully!");
            setShouldFetchClasses((value) => !value);
          })
          .catch((err) => {
            notifyFail(
              "Error to delete account, please check error in the console!"
            );
            console.error("Error to delete account: ", err);
          });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingValues((prevValues) => ({ ...prevValues, [name]: value }));
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
                    <h5 className="card-title fw-semibold mb-4">
                      All Students Accounts
                    </h5>
                    <input
                      type="text"
                      placeholder="Search by username, fullName, email,or phone number "
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
                              <h6 className="fw-semibold mb-0">Avatar</h6>
                            </th>

                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">username</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">password</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Fullname</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Email</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">PhoneNumber</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Birthday</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Action</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAccounts.map((item, index) => {
                            const isEditing = editingClassId === item.id;
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
                                      src={item.imageAccount}
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
                                    <h6
                                      className="fw-semibold mb-0"
                                      style={{ width: "80px" }}>
                                      {item.userName}
                                    </h6>
                                  </td>{" "}
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        style={{ width: "70px" }}
                                      />
                                    ) : (
                                      <p
                                        className="fw-semibold mb-0"
                                        style={{ width: "70px" }}>
                                        encrypted
                                      </p>
                                    )}
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <input
                                        type="text"
                                        onChange={handleChange}
                                        name="fullName"
                                        value={editingValues.fullName}
                                        style={{ width: "150px" }}
                                      />
                                    ) : (
                                      <h6
                                        className="fw-semibold text-wrap mb-0"
                                        style={{ width: "150px" }}>
                                        {item.fullName}
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
                                        <input
                                          onChange={handleChange}
                                          type="number"
                                          name="phoneNumber"
                                          value={editingValues.phoneNumber}
                                          style={{ width: "80px" }}
                                        />
                                      ) : (
                                        <h6
                                          className="fw-semibold text-wrap mb-0"
                                          style={{ width: "80px" }}>
                                          {item.phoneNumber}
                                        </h6>
                                      )}
                                    </div>
                                  </td>
                                  <td className="border-bottom-0">
                                    {isEditing ? (
                                      <input
                                        type="date"
                                        onChange={handleChange}
                                        name="birthday"
                                        value={editingValues.birthday}
                                        style={{ width: "75px" }}
                                      />
                                    ) : (
                                      <h6
                                        className="fw-semibold mb-0"
                                        style={{ width: "75px" }}>
                                        {item.birthday}
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
                                      onClick={() => handleDeleteClass(item.id)}
                                      style={{
                                        marginLeft: "10px",
                                        width: "70px",
                                        border: "0",
                                      }}>
                                      Delete
                                    </button>
                                  </td>
                                </tr>
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

export default AdminAccountStudent;
