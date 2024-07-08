import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Thanks = ({isLoggedIn, onLogout}) => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout}/>
      <h1>Thank You!</h1>
      <p>Your payment was successful. Thank you for your purchase!</p>
      <Footer />
    </div>
  );
};

export default Thanks;
