import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "toastify-js";
import "toastify-js/src/toastify.css";
import "./Css/ForgotPassword.css";
const ForgotPassword = () => {
  const [account, setAccount] = useState("");
  const [contact, setContact] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [step, setStep] = useState(1);

  //use to change class name validate when input
  const [isPWAgainValid, setPWAgainValid] = useState("");
  const [isEmailValid, setIsEmailValid] = useState("");
  const [newPwColor, setNewPwColor] = useState("");
  const navigate = useNavigate();
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

  const handleContactChange = (e) => {
    const value = e.target.value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (value === "") {
      setIsEmailValid("");
    } else if (!value.match(pattern)) {
      setIsEmailValid("falseEmail");
    } else {
      setIsEmailValid("trueEmail");
    }
    setContact(value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleNewPasswordAgainChange = (e) => {
    setNewPasswordAgain(e.target.value);
  };
  // const handleNewPasswordChange = (e) => {
  //   setNewPassword(e.target.value);
  // };
  // const handleNewPasswordAgainChange = (e) => {
  //   const value = e.target.value;
  //   setNewPasswordAgain(value);

  //   if (value === "") {
  //     setPWAgainValid("none");
  //   } else if (value !== newPassword) {
  //     setPWAgainValid("0 0px 15px 0px #B90B0B"); // Đỏ
  //   } else {
  //     setPWAgainValid("0 0px 15px 0px #5BF250");
  //     setNewPwColor("0 0px 15px 0px #5BF250");
  //   }
  // };

  useEffect(() => {
    if (newPasswordAgain === "") {
      setPWAgainValid("");
      setNewPwColor("");
    } else if (newPasswordAgain !== newPassword) {
      setPWAgainValid("falsePWAgain"); // Đỏ
      setNewPwColor("falseNewPW");
    } else {
      setPWAgainValid("truePWAgain"); // Xanh lá
      setNewPwColor("trueNewPW");
    }
  }, [newPasswordAgain, newPassword]);

  const handleSendToken = () => {
    notify("Token is being sent, please wait a few seconds...");
    axios
      .post("http://localhost:8080/api/v1/accounts/forgot-password", null, {
        params: {
          email: contact,
        },
      })
      .then((response) => {
        notify("The token has been sent to your email!");
      })
      .catch((error) => {
        console.error("There was an error sending the token:", error); // Log lỗi không mong muốn
        notifyFail("Error to sent token! Check error in the console");
      });
  };

  const handleResetPassword = () => {
    let isRun = true;
    if (newPasswordAgain !== newPassword) {
      isRun = false;
      notifyFail("Password again do not match!");
    }
    if (isRun) {
      axios
        .post("http://localhost:8080/api/v1/accounts/reset-password", null, {
          params: {
            token: token,
            newPassword: newPassword,
          },
        })
        .then((response) => {
          notify("Reset password succesfully!");
          navigate("/login");
        })
        .catch((error) => {
          console.error("There was an error resetting the password!", error);
          notifyFail("Token does not match!");
        });
    }
  };

  const handleFindAccount = () => {
    let isRun = true;
    if (!isEmailValid) {
      isRun = false;
      notifyFail("Invalid email!");
    }
    if (!contact) {
      notifyFail("Email is required!");
      isRun = false;
    }
    if (isRun) {
      axios
        .get(`http://localhost:8080/api/v1/accounts/email/${contact}`)
        .then((res) => {
          setAccount(res.data.data);
          setStep(2);
          console.log(res.data.data);
        })
        .catch((err) => {
          notifyFail("Account not found!");
          console.error(err);
        });
    }
  };
  const handleReturnStep1 = () => {
    setStep(1);
  };
  const handleClickCancel = () => {
    navigate("/login");
  };
  return (
    <div id="forgot">
      <div className="forgot-container">
        {step === 1 && (
          <div className={`forgot-step1 ${step === 1 ? "active" : ""}`}>
            <h2 className="step1-title">Find your account</h2>
            <hr className="line-forgot1" />
            <div className="step1-input">
              <label htmlFor="email">
                Please enter email to find your account!
              </label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleContactChange}
                className={`${isEmailValid} input-forgot input-forgot-email `}
                spellCheck="false"
              />
            </div>
            <hr className="line-forgot1" />
            <button
              className="btn-forgot btn-forgot-find"
              onClick={handleFindAccount}>
              Find
            </button>
            <button
              className="btn-forgot btn-forgot-cancel"
              onClick={handleClickCancel}>
              Cancel
            </button>
          </div>
        )}
        {step === 2 && (
          <div className={`forgot-step2 ${step === 2 ? "active" : "exit"}`}>
            <div className="findAccountSuccess">
              <img src={account && account.imageAccount} alt="" />
              <h1 className="nameAccount">{account && account.fullName}</h1>
              <a href="#" onClick={handleReturnStep1}>
                Not you? Try again!
              </a>
            </div>

            <div className="box-changePass">
              <div className="sendPass">
                <input
                  className="input-forgot input-forgot-token"
                  type="text"
                  placeholder="Enter token"
                  onChange={handleTokenChange}
                />{" "}
                <button
                  className="btn-forgot btn-forgot-sendToken"
                  onClick={handleSendToken}>
                  Send token
                </button>
              </div>
              <input
                type="password"
                placeholder="Enter new password"
                className={`${newPwColor} input-forgot input-forgot-newPass`}
                onChange={handleNewPasswordChange}
              />
              <input
                type="password"
                placeholder="Enter new password again"
                className={`${isPWAgainValid} input-forgot input-forgot-newPassAgain`}
                onChange={handleNewPasswordAgainChange}
              />
              <br />
              <button
                className="btn-forgot btn-forgot-submit"
                onClick={handleResetPassword}>
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
