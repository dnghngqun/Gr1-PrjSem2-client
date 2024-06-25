import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Course from "./Component/Course";
import Homepage from "./Component/Homepage";
import Login from "./Component/Login";
import Register from "./Component/Register";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedInUser")
  );

  const handleLogin = (Data) => {
    localStorage.setItem("loggedInUser", Data);
    setIsLoggedIn(Data);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(null);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          }></Route>
        <Route path="/course" element={<Course />}></Route>
        <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
