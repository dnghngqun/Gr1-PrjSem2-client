import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { format, parse, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import "./Css/RegisInformation.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const RegisInformation = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const location = useLocation();
  const { courseId, studyTime, startDate, instructor, totalProgress } =
    location.state || {};
  const [fullname, setFullname] = useState(isLoggedIn.data.fullName);
  const [phoneNumber, setPhoneNumber] = useState(isLoggedIn.data.phoneNumber);
  const [email, setEmail] = useState(isLoggedIn.data.email);

  const birthday = isLoggedIn.data.birthday;

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [editing, setEditing] = useState(false);
  const [orderDetailId, setOrderDetailId] = useState(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [paymentId, setPaymentId] = useState("");

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
    if (birthday) {
      const parsedDate = parseISO(birthday);
      setDay(format(parsedDate, "dd"));
      setMonth(format(parsedDate, "MM"));
      setYear(format(parsedDate, "yyyy"));
    } else {
      setDay("");
      setMonth("");
      setYear("");
    }
  }, [birthday]); // Chỉ gọi lại khi birthday thay đổi
  const handleDayChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= daysInMonth(month, year)) {
      setDay(value);
    } else {
      setDay("");
    }
  };
  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= 12) {
      setMonth(value);
      if (day > daysInMonth(value, year)) {
        setDay("");
      }
    } else {
      setMonth("");
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= 2099) {
      setYear(value);
      if (day > daysInMonth(month, value)) {
        setDay("");
      }
    } else {
      setYear("");
    }
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  useEffect(() => {
    if (!courseId) return;

    // Lấy thông tin khóa học
    axios
      .get(`http://localhost:8080/api/v1/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
        console.log("Course fetched:", response.data);
      })
      .catch((error) => console.error("Error fetching course:", error));
  }, [courseId]);

  if (!courseId || !course) return <div>Loading...</div>;

  const srcImg = course.imgLink;
  const nameCourse = course.name;
  const price = course.price;
  const discount = 20;
  const totalPrice = price - (price * discount) / 100;

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    const dateString = `${year}-${month}-${day}`;
    const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    const updateAccount = {
      email: email,
      phoneNumber: phoneNumber,
      fullName: fullname,
      birthday: formattedDate,
    };
    const userId = isLoggedIn.data.id;

    axios
      .put(
        `http://localhost:8080/api/v1/accounts/updateInformation/${userId}`,
        updateAccount,
        { withCredentials: true }
      )
      .then((response) => notify("Update information successfully!"))
      .catch((error) => {
        notifyFail("Error to update information!");
        console.log("Error to update info: ", error);
      });
  };

  const handleCreateOrderDetail = () => {
    const orderDetailData = {
      course: { id: courseId },
      order: { id: 1 }, // Replace with actual order ID
      discount: discount,
      totalAmount: totalPrice,
      status: 0, // Set initial status
    };
    axios
      .post("http://localhost:8080/api/v1/orderDetails/", orderDetailData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "ok") {
          setOrderDetailId(response.data.data.id);
          setIsOrderCreated(true);
        }
      })
      .catch((error) => {
        console.error("There was an error creating the order detail!", error);
      });
  };
  const handlePaymentSuccess = (details) => {
    const accountId = isLoggedIn.data.id;
    axios
      .post("http://localhost:8080/api/v1/payments", {
        paymentId: details.id, // details.id là paymentId do PayPal trả về
        account: { id: accountId }, // Thay đổi ID của người dùng tương ứng
        orderDetail: { id: orderDetailId },
        paymentMethod: "PayPal",
        amount: totalPrice,
      })
      .then((response) => {
        console.log("Payment saved successfully:", response.data);
        setPaymentId(details.id);

        // Hiển thị thông báo SweetAlert2 ở giữa màn hình và chuyển hướng sau khi thông báo hiển thị xong
        Swal.fire({
          icon: "success",
          title: "Payment successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Chuyển hướng đến trang UserCourse
          navigate("/user/mycourse");
        });

        // Lấy thông tin class
        axios
          .get("http://localhost:8080/api/v1/class/")
          .then((response) => {
            // Tìm lớp học thỏa mãn điều kiện
            const foundClass = response.data.data.find((item) => {
              return (
                item.location === studyTime &&
                item.startDate === startDate &&
                item.instructor.name === instructor
              );
            });

            if (foundClass) {
              const classId = foundClass.id;
              console.log("Found class with id:", classId);

              const enrollmentObject = {
                aClass: {
                  id: classId,
                },
                account: {
                  id: accountId,
                },
                progress: totalProgress,
                status: 0,
              };

              // Tạo enrollment
              axios
                .post(
                  "http://localhost:8080/api/v1/enrollments",
                  enrollmentObject
                )
                .then((response) => {
                  console.log("Create enrollment success!", response.data);
                })
                .catch((error) =>
                  console.error("Error create enrollment: ", error)
                );
            } else {
              console.log("No class found matching the criteria.");
            }
          })
          .catch((error) =>
            console.error("Error fetching class information:", error)
          );
      })
      .catch((error) => {
        console.error("Payment saving failed:", error);
        axios
          .delete(`http://localhost:8080/api/v1/orderDetails/${orderDetailId}`)
          .then(() => {
            console.log("OrderDetail deleted successfully");
          })
          .catch((deleteError) => {
            console.error("Failed to delete orderDetail:", deleteError);
          });
      });
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="form-container">
        <div className="left">
          <h1 className="title">Course Registration Information </h1>
          <hr className="line line-left" />
          <label htmlFor="fullname" className="label">
            Fullname
          </label>
          <br />
          {editing ? (
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          ) : (
            <span>{fullname}</span>
          )}
          <br />
          <label htmlFor="phoneNumber" className="label phoneNumber">
            PhoneNumber
          </label>
          <br />
          {editing ? (
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <span>{phoneNumber}</span>
          )}
          <br />
          <label htmlFor="email" className="label email">
            Email
          </label>
          <br />
          {editing ? (
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{email}</span>
          )}
          <br />
          <label htmlFor="" className="label">
            Birthday
          </label>
          <div className="birthday">
            <div className="div-day">
              <label htmlFor="day" className="day label">
                Day
              </label>
              <br />
              {editing ? (
                <input
                  type="number"
                  min="1"
                  max="31"
                  step="1"
                  id="day"
                  value={day}
                  onChange={handleDayChange}
                />
              ) : (
                <span>{day}</span>
              )}
            </div>
            <div className="div-month">
              <label htmlFor="month" className="month label">
                Month
              </label>
              <br />
              {editing ? (
                <input
                  type="number"
                  min="1"
                  max="12"
                  step="1"
                  id="month"
                  value={month}
                  onChange={handleMonthChange}
                />
              ) : (
                <span>{month}</span>
              )}
            </div>
            <div className="div-year">
              <label htmlFor="year" className="year label">
                Year
              </label>
              <br />
              {editing ? (
                <input
                  type="number"
                  min="1930"
                  max="2099"
                  step="1"
                  id="year"
                  value={year}
                  onChange={handleYearChange}
                />
              ) : (
                <span>{year}</span>
              )}
            </div>
          </div>
          {editing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
        <div className="right">
          <div className="course-info">
            <div className="left">
              <img src={srcImg} alt="" />
            </div>
            <div className="right">
              <h1 className="title title-course">{nameCourse}</h1>
              <p className="content">bởi trung tâm anh ngữ...</p>
            </div>
          </div>
          <div className="info-order">
            <p>
              <b>Instructor:</b> {instructor}
            </p>
            <p>
              <b>Learning Times:</b> {studyTime}
            </p>
            <p>
              <b>Expected start date:</b> {startDate}
            </p>
            <p>
              <b>Price:</b> ${price}
            </p>
          </div>
          <hr className="line" />
          <div className="info-order">
            <p>
              <b>Discount:</b> {discount}%
            </p>
            <p>
              <b>Total Price:</b> ${totalPrice}
            </p>
          </div>
          {!isOrderCreated ? (
            <button onClick={handleCreateOrderDetail}>
              Proceed to Payment
            </button>
          ) : (
            <PayPalScriptProvider
              options={{
                clientId:
                  "AepPazLLE1Y5T64DNcxC0n1b_tUhBUxwUcF91sF-wzLSuUwm4xEkbMV2PH9ntwLSArE1Hkd-TJ4zU4XC",
              }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handlePaymentSuccess(details);
                  });
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisInformation;
