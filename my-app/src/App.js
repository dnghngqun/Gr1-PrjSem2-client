import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Course from "./Component/Course";
import Homepage from "./Component/Homepage";
import Login from "./Component/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/course" element={<Course />}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
