import React from "react";
import "./Css/ProgressBar.css";

const ProgressBar = ({ sessions }) => {
  return (
    <div>
      <div className="progress-bar">
        {sessions.map((session, index) => (
          <div
            key={index}
            className={`progress-bar__segment ${session.status}`}
            style={{ width: `calc(100% / ${sessions.length})` }}></div>
        ))}
      </div>
      <div className="note">
        <div className="note-child">
          <span className="note-img note-green"></span> <span>Present</span>
        </div>
        <div className="note-child">
          <span className="note-img note-red"></span> <span>Absent</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
