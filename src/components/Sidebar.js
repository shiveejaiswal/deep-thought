import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ isExpanded, onToggle, tasks, selectedTaskId, onTaskSelect }) {
  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h3>Journey Board</h3>
        <button onClick={onToggle} className="toggle-button">
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>
      <div className="sidebar-content">
        <ul className="task-list">
          {tasks.map((task) => (
            <li 
              key={task.id}
              className={`task-item ${selectedTaskId === task.id ? 'active' : ''}`}
              onClick={() => onTaskSelect(task.id)}
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

