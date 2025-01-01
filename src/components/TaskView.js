import React from 'react';
import AssetRenderer from './AssetRenderer';
import '../styles/TaskView.css';

function TaskView({ task, selectedAssetId }) {
  if (!task) return null;

  const selectedAsset = task.assets.find(asset => asset.asset_id === selectedAssetId);

  return (
    <div className="task-view">
      <div className="task-header">
        <h1>{task.task_title}</h1>
        <button className="submit-task">Submit task</button>
      </div>
      <div className="task-description">
        <p>{task.task_description}</p>
      </div>
      {selectedAsset && (
        <div className="asset-container">
          <div className="asset-header">
            <h2>{selectedAsset.asset_title}</h2>
            <div className="asset-info">ⓘ</div>
          </div>
          <p className="asset-description">{selectedAsset.asset_description}</p>
          <AssetRenderer asset={selectedAsset} />
        </div>
      )}
    </div>
  );
}

export default TaskView;

