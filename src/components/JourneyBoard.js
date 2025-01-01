import React from 'react';
import '../styles/JourneyBoard.css';

function JourneyBoard({ isExpanded, onToggle }) {
  const tasks = [
    {
      title: "Explore the world of management",
      subtasks: [
        "Technical Project Management",
        "Threadbuild",
        "Structure your pointers",
        "4SA Method"
      ]
    }
  ];

  return (
    <div className={`journey-board ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="journey-header">
        {isExpanded && <h3>Journey Board</h3>}
        <button onClick={onToggle} className="toggle-button">
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>
      <div className="journey-content">
        {isExpanded ? (
          tasks.map((task, index) => (
            <div key={index} className="task-group">
              <div className="task-title">{task.title}</div>
              <ul className="subtask-list">
                {task.subtasks.map((subtask, subIndex) => (
                  <li key={subIndex} className="subtask-item">
                    {subtask}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="numbers-list">
            {tasks[0].subtasks.map((_, index) => (
              <div key={index} className="number-item">{index + 1}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JourneyBoard;

