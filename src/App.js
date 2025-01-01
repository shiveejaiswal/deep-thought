import React, { useState, useEffect } from 'react';
import JourneyBoard from './components/JourneyBoard';
import TaskView from './components/TaskView';
import './styles/App.css';
import logo from './assets/logo.png';
import homeIcon from './assets/Home.png'; 
import closeIcon from './assets/Settings.png';
import notificationIcon from './assets/Notification.png';

function App() {
  const [tasksData, setTasksData] = useState(null);
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import('./data/tasks.json');
        setTasksData(response.default);
        if (response.default.tasks.length > 0) {
          setSelectedTaskId(response.default.tasks[0].task_id);
          if (response.default.tasks[0].assets.length > 0) {
            setSelectedAssetId(response.default.tasks[0].assets[0].asset_id);
          }
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  if (!tasksData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Company Logo" className="logo-image" />
        </div>
        <div className="header-actions">
          <button className="icon-button">
            <img src={homeIcon} alt="Home" className="icon-image" />
          </button>
          <button className="icon-button">
            <img src={closeIcon} alt="Close" className="icon-image" />
          </button>
          <button className="icon-button">
            <img src={notificationIcon} alt="Notifications" className="icon-image" />
          </button>
          <div className="avatar">
            <img src="https://s3-alpha-sig.figma.com/img/7ac8/5301/b9bfc59f733c9f17f2bede82c41154f1?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQReciHNtF9z1NNTF3Zxjz-vwGX~PPYkP-OqzY~~UQbxJy6H2os9yxwd1JI5IUVE47ocM2KAoieHPoPqRIfaRtXfNLXgLxugpqG80bRnaUP~8524-3d3AUtarkHNHRVvz5-nOG~P~RbDpC94oUIMdTQVk1VG--MUPUNVxxPkWx3-yoJKvqdHxWWxxIgmBZxRUf~Kg3Ie9HnUdiD1wZ8KnA7MjY~UgNJxI2qOaCRiX1qzbNuNtSOv0kGbHz-bNC08rjwp5tNt01Pc5MFBa2v7D4krwcJqveNmuf-TvnroW7vWYVAhbK3NYjBHLIOu1hSsi-Kvh3ExcPTliqjutL4Tbg__" alt="User" className="avatar-img" />
          </div>
          <button className="more-options-button">
            <span className="more-options-icon">⋮</span> {/* Three vertical dots */}
          </button>
        </div>
      </header>
      <div className="app-container">
        <JourneyBoard 
          isExpanded={isSidebarExpanded}
          onToggle={toggleSidebar}
          tasks={tasksData.tasks}
          selectedTaskId={selectedTaskId}
          selectedAssetId={selectedAssetId}
          onAssetSelect={setSelectedAssetId}
          onTaskSelect={setSelectedTaskId}
        />
        <main className="main-content">
          {selectedTaskId && (
            <TaskView 
              task={tasksData.tasks.find(t => t.task_id === selectedTaskId)}
              selectedAssetId={selectedAssetId}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
