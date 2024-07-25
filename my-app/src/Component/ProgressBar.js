
import React from "react";
import "./Css/ProgressBar.css";

const ProgressBar = ({ sessions }) => {
  // Đếm số buổi điểm danh theo trạng thái
  const presentCount = sessions.filter(session => session.attendanceStatus === 'present').length;
  const absentCount = sessions.filter(session => session.attendanceStatus === 'absent').length;
  const totalCount = sessions.length;

  return (
    <div>
      <div className="progress-bar">
        {sessions.map((session, index) => (
          <div
            key={index}
            className={`progress-bar__segment ${session.attendanceStatus}`}
            style={{ width: `calc(100% / ${sessions.length})` }}></div>
        ))}
      </div>
      <div className="note">
        <div className="note-child">
          <span className="note-img note-green"></span> 
          <span>Present ({presentCount}/{totalCount})</span>
        </div>
        <div className="note-child">
          <span className="note-img note-red"></span> 
          <span>Absent ({absentCount}/{totalCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
