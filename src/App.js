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

  const handleStartSession = (sessionData) => {
    setSessionInfo(sessionData);
    setSelectedTool(sessionData.selectedTools[0]); // Sélectionner le premier outil
    setIsSessionStarted(true);
  };

  if (!isSessionStarted) {
    return <SessionConfig onStartSession={handleStartSession} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        selectedTool={selectedTool} 
        onSelectTool={setSelectedTool} 
        tools={sessionInfo ? sessionInfo.selectedTools : []}
      />
      <div className="flex flex-col flex-1">
        <Header projectName={sessionInfo.projectName} />
        <MainContent 
          selectedTool={selectedTool}
          projectName={sessionInfo.projectName}
        />
      </div>
    </div>
  );
};

export default App;