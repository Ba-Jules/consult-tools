import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SessionConfig from './components/SessionConfig';
import './index.css';

const App = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [openTools, setOpenTools] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleStartSession = (sessionData) => {
    setSessionInfo(sessionData);
    setSelectedTool(sessionData.selectedTools[0]); // Sélectionner le premier outil
    setOpenTools([sessionData.selectedTools[0]]); // Ouvrir le premier outil
    setIsSessionStarted(true);
  };

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
    if (!openTools.includes(tool)) {
      setOpenTools([...openTools, tool]);
    }
  };

  const handleCloseTab = (tool) => {
    setOpenTools(openTools.filter(t => t !== tool));
    if (selectedTool === tool) {
      setSelectedTool(openTools[openTools.length - 2] || null);
    }
  };

  if (!isSessionStarted) {
    return <SessionConfig onStartSession={handleStartSession} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        selectedTool={selectedTool} 
        onSelectTool={handleSelectTool} 
        tools={sessionInfo ? sessionInfo.selectedTools : []}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />
      <div className="flex flex-col flex-1">
        <Header projectName={sessionInfo.projectName} />
        <div className="flex border-b mb-4">
          {openTools.map(tool => (
            <div 
              key={tool}
              className={`px-4 py-2 cursor-pointer ${tool === selectedTool ? 'bg-blue-100' : 'bg-gray-100'}`}
              onClick={() => setSelectedTool(tool)}
            >
              {tool}
              <button className="ml-2" onClick={() => handleCloseTab(tool)}>×</button>
            </div>
          ))}
        </div>
        <MainContent 
          selectedTool={selectedTool}
          projectName={sessionInfo.projectName}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
      </div>
    </div>
  );
};

export default App;