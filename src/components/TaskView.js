import React, { useState } from 'react';
import AssetRenderer from './AssetRenderer';
import '../styles/TaskView.css';

function TaskView({ asset }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!asset) return null;

  return (
    <div className="task-section">
      <div className="asset-header">
        <h3>{asset.asset_title}</h3>
        <button 
          className="info-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          ⓘ
        </button>
      </div>
      <div className="asset-description-container">
        <p className="asset-description">{asset.asset_description}</p>
      </div>
      <AssetRenderer asset={asset} />
    </div>
  );
}

export default TaskView;
