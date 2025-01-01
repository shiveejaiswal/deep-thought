import React from 'react';
import '../styles/NoticeBoard.css';

function NoticeBoard({ isExpanded, onToggle }) {
  return (
    <div className={`notice-board ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="notice-header" onClick={onToggle}>
        <h3>Notice Board</h3>
        <button className="toggle-button">
          {isExpanded ? '▶' : '◀'}
        </button>
      </div>
      {isExpanded && (
        <div className="notice-content">
          <div className="notice-item">
            <h4>General Instructions</h4>
            <p>This is an example notice. More notices will appear here.</p>
          </div>
          {/* Add more notice items as needed */}
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;
