import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Admin from "./Component/Admin";
import Course from "./Component/Course";
import EditProfile from "./Component/EditProfile";
import ForgotPassword from "./Component/ForgotPassword";
import Homepage from "./Component/Homepage";
import Login from "./Component/Login";
import RegisInformation from "./Component/RegisInformation";
import Register from "./Component/Register";
import Thanks from "./Component/Thanks";
import UserCourse from "./Component/UserCourse";
import ViewDetail from "./Component/ViewDetail";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    //check login qua session
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/accounts/currentUser",
          { withCredentials: true }
        );
        setIsLoggedIn(response.status === 200 ? response.data : null);
      } catch (error) {
        console.error("Error checking login status ", error);
        setIsLoggedIn(null);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(userData);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/accounts/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(null);
    } catch (error) {
      console.error("Logout error, ", error);
    }
  };
  return (
    <BrowserRouter>
      <ScrollToTopOnMount />
      <Routes>
        <Route
          path="/paymentInformation"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : (
              <RegisInformation
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
            )
          }></Route>
        <Route
          path="/"
          element={
            <Homepage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          }></Route>
        <Route
          path="/course"
          element={
            <Course isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          }></Route>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}></Route>
        <Route
          path="/course/:courseId"
          element={
            <ViewDetail isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          }></Route>
        <Route
          path="/thanks"
          element={<Thanks isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route
          path="/user/mycourse"
          element={
            isLoggedIn ? (
              <UserCourse isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user/editprofile"
          element={
            isLoggedIn ? (
              <EditProfile isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* <Route
          path="/user/mycourse"
          element={
            <UserCourse isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
