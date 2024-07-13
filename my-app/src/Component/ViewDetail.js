import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Css/ViewDetail.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
const ViewDetail = ({ isLoggedIn, onLogout }) => {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [sections, setSections] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const { courseId } = useParams();
  const [classIn4, setClassIn4] = useState([]);
  const [selectedStudyTime, setSelectedStudyTime] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  console.log("Classin4: ", classIn4);
  useEffect(() => {
    // Lấy thông tin khóa học
    axios
      .get(`http://localhost:8080/api/v1/courses/${courseId}`)
      .then((response) => setCourse(response.data))
      .catch((error) => console.error("Error fetching course:", error));

    // Lấy danh sách bài học
    axios
      .get(`http://localhost:8080/api/v1/courses/${courseId}/lessons`)
      .then((response) => setLessons(response.data))
      .catch((error) => console.error("Error fetching lessons:", error));

    // Lấy danh sách các phần
    axios
      .get(`http://localhost:8080/api/v1/courses/${courseId}/sections`)
      .then((response) => setSections(response.data))
      .catch((error) => console.error("Error fetching sections:", error));

    //lấy thông tin giáo viên
    axios
      .get(`http://localhost:8080/api/v1/instructors`)
      .then((response) => setInstructors(response.data))
      .catch((error) => console.error("Error fetching instructor: ", error));

    axios
      .get(`http://localhost:8080/api/v1/class/`)
      .then((response) => setClassIn4(response.data.data))
      .catch((error) =>
        console.error("Error fetching class information: ", error)
      );
  }, [courseId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };
  // Hàm xử lý khi thay đổi thời gian học
  const handleStudyTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedStudyTime(selectedTime);
    setSelectedStartDate(""); // Đặt lại startDate khi thay đổi study time
    setSelectedInstructor(""); // Đặt lại instructor khi thay đổi study time
  };

  // Hàm xử lý khi thay đổi ngày bắt đầu
  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedStartDate(selectedDate);
    setSelectedInstructor(""); // Đặt lại instructor khi thay đổi start date
  };

  if (!course) return <div>Loading...</div>;
  //else return code into bottom
  return (
    <div id="view-course">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="toeic-container">
        <div className="basic-toeic">
          <div className="goal-title">
            <h1 style={{ textAlign: "center" }}>
              <span className="hightlight">{course.name}</span> Class
            </h1>
            {/* <div>
              <h2>Goal: 550+</h2>
            </div> */}
          </div>
          <div className="goal">
            <div className="goal-detail">
              <div className="goal-detail1">
                <h3>{sections.goalTitle}</h3>
                {sections.contentGoal &&
                  sections.contentGoal
                    .split("\n")
                    .map((line, index) => <p key={index}>{line}</p>)}
              </div>
              <div className="goal-detail2">
                <h3>{sections.introduce}</h3>
                <p>{sections.contentIntroduce}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-details">
          <h2 style={{ color: "black" }}>Course Details</h2>
          <div className="details-list">
            <div className="details-list1">
              {sections.details &&
                sections.details
                  .split("\n")
                  .map((line, index) => <h2 key={index}>{line}</h2>)}
              {/* <h2>27 lessons</h2>
              <h2 className="month">
                {"("}2 months a week{")"}
              </h2> */}
              <ul>
                {sections.contentDetails &&
                  sections.contentDetails
                    .split("\n")
                    .map((line, index) => <li key={index}>{line}</li>)}
              </ul>
            </div>
            <div className="detailsTwo">
              <div className="details-list2">
                <img src="/assets/img/clock-img.png" className="clock" alt="" />
                <h2>{sections.countLessons}</h2>
                <p>{sections.durationLesson}</p>
                <p>{sections.supportTime}</p>
              </div>
              <div className="details-list3">
                <h2>Class Size</h2>
                <p>{sections.classSize}</p>
                <p>{sections.contentClassSize}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-content">
          <h2>Course Content</h2>
          <table className="content-table">
            <tbody>
              <tr>
                <th>Lessons</th>
                <th>Topics Covered</th>
                <th>Outcome</th>
              </tr>
              {lessons.map((lesson, index) => (
                <tr key={index}>
                  <td className="td-number">{lesson.lessonNumber}</td>
                  <td className="td-topic">
                    {lesson.topicsCovered &&
                      lesson.topicsCovered
                        .split("\n")
                        .map((line, index) => <p key={index}>{line}</p>)}
                  </td>
                  <td className="td-outcome">
                    {lesson.outcome &&
                      lesson.outcome
                        .split("\n")
                        .map((line, index) => <p key={index}>{line}</p>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sign-course">
          <h2 style={{ color: "#127c71", marginBottom: "10px" }}>
            Register for the course
          </h2>
          <div className="sigh-schedule">
            <select className="study-time" onChange={handleStudyTimeChange}>
              <option value="">Study time</option>
              {classIn4 &&
                classIn4
                  .filter((item) => item.course.id === parseInt(courseId))
                  .map((item) => {
                    return (
                      <option key={item.id} value={item.location}>
                        {item.location}
                      </option>
                    );
                  })}
            </select>
            <select className="open-date" onChange={handleStartDateChange}>
              <option value="">Choose Start Date</option>
              {classIn4
                .filter(
                  (item) =>
                    item.location === selectedStudyTime &&
                    item.course.id === parseInt(courseId)
                )
                .map((item) => (
                  <option key={item.id} value={item.startDate}>
                    {formatDate(item.startDate)}
                  </option>
                ))}
            </select>
            <select className="teacher">
              <option value="">Choose Instructor</option>
              {instructors
                .filter((instructor) =>
                  classIn4.some(
                    (cls) =>
                      cls.instructor.id === instructor.id &&
                      cls.location === selectedStudyTime &&
                      cls.startDate === selectedStartDate
                  )
                )
                .map((instructor) => (
                  <option key={instructor.id} value={instructor.name}>
                    {instructor.name}
                  </option>
                ))}
            </select>
            <a href="/paymentInformation">Sign up</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewDetail;
