import React from "react";
import "./Css/ViewDetail.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ViewDetail = ({ isLoggedIn, onLogout }) => {
  return (
    <div id="view-course">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="toeic-container">
        <div className="basic-toeic">
          <div className="goal-title">
            <h1 style={{ textAlign: "center" }}>
              Basic <span className="hightlight">TOEIC</span> Class
            </h1>
            <div>
              <h2>Goal: 550+</h2>
            </div>
          </div>
          <div className="goal">
            <div className="goal-detail">
              <div className="goal-detail1">
                <h3>Goal: 550+ TOEIC Listening & Reading</h3>
                <p>
                  Students will obtain a TOEIC certificate at 110 within 2
                  months after the course ends (to ensure sufficient knowledge
                  retention for the exam, a free 100% retake is offered if the
                  result is below 550).
                </p>
                <p>
                  Additionally, students must meet the attendance and assignment
                  requirements as per the class regulations.
                </p>
              </div>
              <div className="goal-detail2">
                <h3>
                  This course is for those who have a foundation but have never
                  studied TOEIC or have studied but scored below 600.
                </h3>
                <p>
                  The course will focus on essential TOEIC tasks, covering all
                  listening sections (part 1-2-3-4), while simultaneously
                  reviewing basic grammar and introducing fundamental reading
                  sections. With over 15 vocabulary topics through FLASHCARDS,
                  students will quickly expand their vocabulary. After the
                  course, students typically achieve a score of 550+. This
                  vocabulary set is compiled from ETS TOEIC exam materials to
                  facilitate learning.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-details">
          <h2 style={{ color: "black" }}>Course Details</h2>
          <div className="details-list">
            <div className="details-list1">
              <h2>27 lessons</h2>
              <h2 className="month">
                {"("}2 months a week{")"}
              </h2>
              <ul>
                <li>Complete all listening sections (part 1-2-3-4)</li>
                <li>Review basic grammar</li>
                <li>Familiarize with basic reading sections</li>
              </ul>
            </div>
            <div className="detailsTwo">
              <div className="details-list2">
                <img src="assets/img/clock-img.png" className="clock" alt="" />
                <h2>3 lessons per week</h2>
                <p>1.5 hours per lesson</p>
                <p>
                  Shift 1: 18:00-18:30, Shift 2: 20:00-21:30 on evenings of
                  Monday, Wednesday, Friday or Tuesday, Thursday, Saturday
                </p>
              </div>
              <div className="details-list3">
                <h2>Class Size</h2>
                <p>23-25 students</p>
                <p>
                  The classroom is equipped with air conditioning and a large
                  screen TV
                </p>
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
              <tr>
                <td>Lesson 1 - Lesson 3</td>
                <td>
                  Practice part 1<br />
                  People description pictures
                  <br />
                  Object description pictures
                  <br />
                  Mixed pictures
                </td>
                <td>
                  Ability to describe situations related to people, including
                  appearance, emotional states, and daily activities.
                  <br />        
                    Capability to describe and identify common objects through
                    images, such as utensils, everyday items, and more.
                  
                </td>
              </tr>
              <tr>
                <td>Lesson 4 - Lesson 8</td>
                <td>Practice Part 2</td>
                <td>
                Learn about everyday communication situations, including discussing work and daily life.
                <br />
                Expand vocabulary related to topics such as travel, shopping, and entertainment.
                <br />
                Practice listening skills and understanding content from simple and useful dialogues.
                </td>
              </tr>
              <tr>
                <td>Lesson 9 - Lesson 19</td>
                <td>
                  Practice Part 3<br />
                  Grammar Part 5-6
                </td>
                <td>
                Study basic grammar structures such as present simple, past simple, and conditional sentences.
                <br />
                Apply grammar rules to enhance accuracy and confidence in speaking and writing English.
                </td>
              </tr>
              <tr>
                <td>Lesson 20 - Lesson 26</td>
                <td>
                  Practice part 4<br />
                  Grammar Part 5-6
                  <br />
                  Practice tests
                </td>
                <td>
                Develop the ability to synthesize and apply learned knowledge in real-life situations.
                <br />
                Familiarize yourself with high-applicability exercises, such as reading and evaluating information from short passages and articles.
                </td>
              </tr>
              <tr>
                <td>Lesson 27</td>
                <td>Final test</td>
                <td>
                Comprehensive assessment of listening, reading, speaking, and writing skills in the TOEIC exam format.
                <br />
                Evaluate personal progress and determine readiness for the actual exam.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="sign-course">
          <h2 style={{ color: "#127c71", marginBottom: "10px" }}>
            Register for the course
          </h2>
          <div className="sigh-schedule">
            <select className="study-time">
              <option>from 8am to 10am</option>
              <option>from 1pm to 3pm</option>
              <option>from 3pm to 5pm</option>
            </select>
            <select className="open-date">
              <option>1st semester: June 15, 2023</option>
              <option>2nd semester: January 14, 2024</option>
            </select>
            <select className="teacher">
              <option>Mrs.Ly</option>
              <option>Mrs.Hoa</option>
              <option>Mrs.Dung</option>
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
