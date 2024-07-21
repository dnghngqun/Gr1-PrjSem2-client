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
import Minitest from "./Component/Minitest";
import PrivateRoute from "./Component/PrivateRoute";
import RegisInformation from "./Component/RegisInformation";
import Register from "./Component/Register";
import ResultPage from "./Component/ResultPage";
import Staff from "./Component/Staff";
import StaffClass from "./Component/StaffClass";
import StaffInstructor from "./Component/StaffInstructor";
import StaffStudent from "./Component/staffStudent";
import UserCourse from "./Component/UserCourse";
import ViewDetail from "./Component/ViewDetail";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [refresh, setRefresh] = useState(false);
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
  }, [refresh]);

  const handleLogin = (userData) => {
    setIsLoggedIn(userData);
  };
  const triggerRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh); // Chuyển đổi giá trị của refresh
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
              <PrivateRoute
                element={
                  <RegisInformation
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                  />
                }
                isLoggedIn={isLoggedIn}
                allowedRoles={["customer"]}
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

        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={
                <Admin onLogout={handleLogout} isLoggedIn={isLoggedIn} />
              }
              isLoggedIn={isLoggedIn}
              allowedRoles={["admin"]}
            />
          }></Route>
        <Route
          path="/staff"
          element={
            <PrivateRoute
              element={
                <Staff onLogout={handleLogout} isLoggedIn={isLoggedIn} />
              }
              isLoggedIn={isLoggedIn}
              allowedRoles={["staff"]}
            />
          }></Route>
        <Route
          path="/staff/student"
          element={
            <PrivateRoute
              element={
                <StaffStudent onLogout={handleLogout} isLoggedIn={isLoggedIn} />
              }
              isLoggedIn={isLoggedIn}
              allowedRoles={["staff"]}
            />
          }
        />
        <Route
          path="/staff/class"
          element={
            <PrivateRoute
              element={
                <StaffClass onLogout={handleLogout} isLoggedIn={isLoggedIn} />
              }
              isLoggedIn={isLoggedIn}
              allowedRoles={["staff"]}
            />
          }
        />
        <Route
          path="/staff/instructor"
          element={
            <PrivateRoute
              element={
                <StaffInstructor
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              }
              isLoggedIn={isLoggedIn}
              allowedRoles={["staff"]}
            />
          }
        />
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
              <EditProfile
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                triggerRefresh={triggerRefresh}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/minitest" element={<Minitest />} />
        <Route path="/result" element={<ResultPage />} />
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
