import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const UserCourse = ({ isLoggedIn, onLogout }) => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
        
      <Footer />
    </div>
  );
};

export default UserCourse;
