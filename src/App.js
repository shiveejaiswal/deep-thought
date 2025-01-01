import React, { useState, useEffect } from 'react';
import JourneyBoard from './components/JourneyBoard';
import TaskView from './components/TaskView';
import NoticeBoard from './components/NoticeBoard';
import FloatingActions from './components/FloatingActions';
import './styles/App.css';
import logo from './assets/logo.png';
import homeIcon from './assets/Home.png';
import settingsIcon from './assets/Settings.png';
import notificationIcon from './assets/Notification.png';

function App() {
  const [projectData, setProjectData] = useState(null);
  const [isJourneyBoardExpanded, setIsJourneyBoardExpanded] = useState(true);
  const [isNoticeBoardExpanded, setIsNoticeBoardExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import('./data/tasks.json');
        setProjectData(response.default);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading tasks:', error);
        setError('Failed to load project data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleJourneyBoard = () => {
    setIsJourneyBoardExpanded(!isJourneyBoardExpanded);
  };

  const toggleNoticeBoard = () => {
    setIsNoticeBoardExpanded(!isNoticeBoardExpanded);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!projectData) {
    return <div className="error">No project data available.</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <img src={logo} alt="Deep Thought" className="logo-image" />
        </div>
        <div className="header-actions">
          <button className="icon-button">
            <img src={homeIcon} alt="Home" className="icon-image" />
          </button>
          <button className="icon-button">
            <img src={settingsIcon} alt="Settings" className="icon-image" />
          </button>
          <button className="icon-button">
            <img src={notificationIcon} alt="Notifications" className="icon-image" />
          </button>
          <div className="avatar">
            <img src="https://s3-alpha-sig.figma.com/img/7ac8/5301/b9bfc59f733c9f17f2bede82c41154f1?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hQReciHNtF9z1NNTF3Zxjz-vwGX~PPYkP-OqzY~~UQbxJy6H2os9yxwd1JI5IUVE47ocM2KAoieHPoPqRIfaRtXfNLXgLxugpqG80bRnaUP~8524-3d3AUtarkHNHRVvz5-nOG~P~RbDpC94oUIMdTQVk1VG--MUPUNVxxPkWx3-yoJKvqdHxWWxxIgmBZxRUf~Kg3Ie9HnUdiD1wZ8KnA7MjY~UgNJxI2qOaCRiX1qzbNuNtSOv0kGbHz-bNC08rjwp5tNt01Pc5MFBa2v7D4krwcJqveNmuf-TvnroW7vWYVAhbK3NYjBHLIOu1hSsi-Kvh3ExcPTliqjutL4Tbg__" alt="User" className="avatar-img" />
          </div>
          <button className="more-options-button">
            <span className="more-options-icon">⋮</span>
          </button>
        </div>
      </header>
      <div className="app-container">
        <JourneyBoard 
          isExpanded={isJourneyBoardExpanded}
          onToggle={toggleJourneyBoard}
        />
        <main className={`main-content ${!isJourneyBoardExpanded ? 'sidebar-collapsed' : ''} ${isNoticeBoardExpanded ? 'notice-board-expanded' : ''}`}>
          <div className="page-header">
            <div>
              <h1 className="page-title">Technical Project Management</h1>
              <p className="page-description">
                As a project manager, you play an important role in leading a project through initiation, planning, execution, monitoring, controlling and completion. How? Do you want to manage each and every step of your life?
              </p>
            </div>
            <button className="submit-task-button">Submit task</button>
          </div>
          <div className="task-grid">
            {projectData.tasks[0].assets.map((asset) => (
              <TaskView key={asset.asset_id} asset={asset} />
            ))}
          </div>
        </main>
        <NoticeBoard 
          isExpanded={isNoticeBoardExpanded}
          onToggle={toggleNoticeBoard}
        />
      </div>
      <FloatingActions onNoticeBoard={toggleNoticeBoard} />
    </div>
  );
}

export default App;
