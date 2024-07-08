import axios from "axios";
import React, { useState } from "react";
import "./Css/ForgotPassword.css";
const ForgotPassword = () => {
  const [method, setMethod] = useState("");
  const [contact, setContact] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [step, setStep] = useState(1);
  const [toastError, setToastError] = useState("");

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSendToken = () => {
    console.log(contact); // Log để kiểm tra giá trị của contact
    if (!contact) {
      console.error("Email is required.");
      return;
    }

    axios
      .post("http://localhost:8080/api/v1/accounts/forgot-password", null, {
        params: {
          email: contact,
        },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          setStep(2); // Chuyển sang bước 2 nếu thành công
        } else {
          console.log("Failed:", response.data.message); // Log thông báo lỗi nếu cần
          setToastError(response.data.message); // Đặt trạng thái lỗi với thông báo từ backend
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log("Error response:", error.response); // Log phản hồi lỗi từ backend
          console.log("Error message:", error.message); // Log thông báo lỗi từ error object
        } else {
          console.error("There was an error sending the token:", error); // Log lỗi không mong muốn
          setToastError(error.response.data.message);
          console.log(toastError);
        }
      });
  };

  const handleVerifyToken = () => {
    axios
      .post("http://localhost:8080/api/v1/accounts/reset-password", null, {
        params: {
          email: contact,
          token: token,
        },
      })
      .then((response) => {
        setStep(3);
      })
      .catch((error) => {
        console.error("There was an error verifying the token!", error);
      });
  };

  const handleResetPassword = () => {
    axios
      .post("http://localhost:8080/api/v1/accounts/reset-password", null, {
        params: {
          email: contact,
          token: token,
          newPassword: newPassword,
        },
      })
      .then((response) => {
        setConfirmationMessage("Mật khẩu của bạn đã được đặt lại thành công!");
        setStep(3);
      })
      .catch((error) => {
        console.error("There was an error resetting the password!", error);
      });
  };

  return (
    <div id="forgot">
      <div className=" forgot-container">
        <h2>Quên mật khẩu</h2>
        <div>
          <label>
            <input
              type="radio"
              value="email"
              checked={method === "email"}
              onChange={handleMethodChange}
            />
            Email
          </label>
          {method === "email" && step === 1 && (
            <div>
              <input
                type="text"
                placeholder="Nhập email"
                value={contact}
                onChange={handleContactChange}
              />
              <button onClick={handleSendToken}>Gửi mã</button>
            </div>
          )}
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="phone"
              checked={method === "phone"}
              onChange={handleMethodChange}
            />
            Số điện thoại
          </label>
          {method === "phone" && step === 1 && (
            <div>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={contact}
                onChange={handleContactChange}
              />
              <button onClick={handleSendToken}>Gửi mã</button>
            </div>
          )}
        </div>
        {step === 2 && (
          <div>
            <h2>Nhập mã xác thực</h2>
            <input
              type="text"
              placeholder="Nhập mã xác thực"
              value={token}
              onChange={handleTokenChange}
            />
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <button onClick={handleResetPassword}>Đặt lại mật khẩu</button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2>{confirmationMessage}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
