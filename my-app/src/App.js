import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Course from "./Component/Course";
import Homepage from "./Component/Homepage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/course" element={<Course />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
