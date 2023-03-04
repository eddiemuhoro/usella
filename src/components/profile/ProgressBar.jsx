import React from 'react';
import './progress.css';
const ProgressBar = ({ skillLevel }) => {
  const percentage = `${skillLevel}%`;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: percentage }}>
          <span className="progress-bar-label">{percentage}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
