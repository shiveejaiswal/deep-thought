import React from 'react';
import '../styles/JourneyBoard.css';

function JourneyBoard({ 
  isExpanded, 
  onToggle, 
  tasks, 
  selectedTaskId, 
  selectedAssetId,
  onAssetSelect,
  onTaskSelect 
}) {
  return (
    <div className={`journey-board ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="journey-board-header">
        <button onClick={onToggle} className="toggle-button">
          {isExpanded ? '◀' : '▶'}
        </button>
        <h3 className="journey-board-title">Journey Board</h3>
      </div>
      <div className="journey-board-content">
        {tasks.map((task) => (
          <div 
            key={task.task_id} 
            className={`task-group ${selectedTaskId === task.task_id ? 'active' : ''}`}
            onClick={() => onTaskSelect(task.task_id)}
          >
            <div className="task-title">{task.task_title}</div>
            {isExpanded && (
              <ul className="asset-list">
                {task.assets.map((asset) => (
                  <li 
                    key={asset.asset_id}
                    className={`asset-item ${selectedAssetId === asset.asset_id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAssetSelect(asset.asset_id);
                    }}
                  >
                    {asset.asset_title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JourneyBoard;

