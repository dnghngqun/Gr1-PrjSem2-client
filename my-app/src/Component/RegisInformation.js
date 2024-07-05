import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/RegisInformation.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
const RegisInformation = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("abc");
  const [phoneNumber, setPhoneNumber] = useState("12345324234");
  const [email, setEmail] = useState("abc@gmail.com");
  const [day, setDay] = useState("4");
  const [month, setMonth] = useState("4");
  const [year, setYear] = useState("2018");
  const [editing, setEditing] = useState(false);
  const [orderDetailId, setOrderDetailId] = useState(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const srcImg = "assets/img/home-hero.webp";
  const nameCourse = "Toeic Basic";
  const Instructor = "Mrs Ly";
  const learningTime = "8am to 10am";
  const startDate = "June 15, 2024";
  const price = "100";
  const discount = 0;

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    console.log("Saved:", {
      fullname,
      phoneNumber,
      email,
      day,
      month,
      year,
    });
  };

  const handleCreateOrderDetail = () => {
    const orderDetailData = {
      course: { id: 1 }, // Replace with actual course ID
      order: { id: 1 }, // Replace with actual order ID
      discount: discount, // Replace with actual discount
      totalAmount: price - price * discount,
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
    console.log(details.id, orderDetailId, price);
    axios
      .post("http://localhost:8080/api/v1/payments", {
        paymentId: details.id, // details.id là paymentId do PayPal trả về
        account: { id: 1 }, // Thay đổi ID của người dùng tương ứng
        orderDetail: { id: orderDetailId },
        paymentMethod: "PayPal",
        amount: price,
      })
      .then((response) => {
        console.log("Payment saved successfully:", response.data);
        setPaymentId(details.id); // Lưu paymentId vào state nếu cần thiết
        navigate("/thanks");
      })
      .catch((error) => {
        console.error("Payment saving failed:", error);
        console.log("Attempting to delete orderDetail with id:", orderDetailId);
        axios
          .delete(`http://localhost:8080/api/v1/orderDetails/${orderDetailId}`)
          .then(() => {
            console.log("OrderDetail deleted successfully");
            //window.history.back(); // Quay lại trang trước đó
          })
          .catch((deleteError) => {
            console.error("Failed to delete orderDetail:", deleteError);
            // Xử lý lỗi khi không thể xóa orderDetail
          });
      });
  };

  return (
    <div>
      <Navbar />
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
                  onChange={(e) => setDay(e.target.value)}
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
                  onChange={(e) => setMonth(e.target.value)}
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
                  onChange={(e) => setYear(e.target.value)}
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
              <h1 className="title">{nameCourse}</h1>
              <p className="content">bởi trung tâm anh ngữ...</p>
            </div>
          </div>
          <div className="info-order">
            <p>
              <b>Instructor:</b> {Instructor}
            </p>
            <p>
              <b>Learning Times:</b> {learningTime}
            </p>
            <p>
              <b>Expected start date:</b> {startDate}
            </p>
            <p>
              <b>Total price:</b> {price}
            </p>
          </div>
          <hr className="line" />
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
                          value: price.toString(),
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
