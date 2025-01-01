import React, { useState } from "react";
import "../styles/AssetRenderer.css";

function AssetRenderer({ asset }) {
  const [threadExpanded, setThreadExpanded] = useState(false);
  const [threads, setThreads] = useState([{ title: "Thread A", content: "", subThreads: [] }]);
  const [expandedSections, setExpandedSections] = useState({});

  if (!asset || !asset.asset_content_type) {
    return null;
  }

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const addSubThread = () => {
    setThreads((prevThreads) => [
      ...prevThreads,
      { title: `Thread ${prevThreads.length + 1}`, content: "", subThreads: [] },
    ]);
  };

  const renderAsset = () => {
    switch (asset.asset_content_type) {
      case "4sa_method":
        return (
          <div className="method-container">
            {Object.entries(asset.asset_content).map(([key, section]) => (
              <div key={key} className="method-section">
                <div
                  className={`method-section-header ${expandedSections[key] ? "expanded" : ""}`}
                  onClick={() => toggleSection(key)}
                >
                  <h3>{section.title}</h3>
                  <span className="arrow">▼</span>
                </div>
                {expandedSections[key] && (
                  <div className="method-section-content">
                    <p>{section.content}</p>
                    {section.hasMore && <button className="see-more-btn">See More</button>}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "video":
        return (
          <div className="video-container">
            <iframe
              src={asset.asset_content}
              title={asset.asset_title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case "threadbuilder":
        return (
          <div className="thread-builder">
            {threads.map((thread, index) => (
              <div key={index} className="thread">
                <div
                  className="thread-header"
                  onClick={() => setThreadExpanded(!threadExpanded)}
                >
                  <h3>{thread.title}</h3>
                  <span className={`arrow ${threadExpanded ? "expanded" : ""}`}>▼</span>
                </div>
                {threadExpanded && (
                  <div className="thread-content">
                    <div className="sub-thread-container">
                      <div className="sub-thread-row">
                        <input type="text" placeholder="Sub thread 1" />
                        <input type="text" placeholder="Sub interpretation 1" />
                      </div>
                      <div className="thread-actions">
                        <button className="action-button">
                          <img src="/assets/lightbulb.png" alt="Lightbulb" />
                        </button>
                        <button className="action-button">
                          <img src="/assets/comment.png" alt="Comment" />
                        </button>
                        <button className="action-button">
                          <img src="/assets/question.png" alt="Question" />
                        </button>
                        <button className="action-button">
                          <img src="/assets/download.png" alt="Download" />
                        </button>
                        <select className="select-dropdown">
                          <option>Select Categ</option>
                        </select>
                        <select className="select-dropdown">
                          <option>Select Process</option>
                        </select>
                      </div>
                    </div>
                    <button className="add-subthread" onClick={addSubThread}>
                      + Sub-thread
                    </button>
                    <textarea
                      className="thread-summary"
                      placeholder="Enter Thread Summary"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "article":
        return (
          <div className="article-editor">
            <input type="text" placeholder="Title" className="article-title" />
            <div className="editor-toolbar">
              <div className="toolbar-group">
                <button>File</button>
                <button>Edit</button>
                <button>View</button>
                <button>Insert</button>
                <button>Format</button>
                <button>Tools</button>
                <button>Table</button>
                <button>Help</button>
              </div>
              <div className="toolbar-group">
                <button>↩</button>
                <button>↪</button>
                <button>⟲</button>
                <button>Paragraph</button>
                <button>⋮</button>
              </div>
            </div>
            <div className="editor-content" contentEditable>
              Write your article here...
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="asset-renderer">{renderAsset()}</div>;
}

export default AssetRenderer;
