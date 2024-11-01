// components/SessionManager.js
import React from 'react';
import ToolInterface from './ToolInterface';
import ParticipantsView from './ParticipantsView';

const SessionManager = ({ 
    selectedTool,
    projectName,
    moderatorName = "Modérateur",
    sessionInfo
}) => {
    if (!selectedTool) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-gray-600">Sélectionnez un outil</div>
            </div>
        );
    }

    return (
        <ToolInterface 
            toolId={selectedTool}
            projectName={projectName}
            moderatorName={moderatorName}
            sessionConfig={{
                totalParticipants: sessionInfo.totalParticipants,
                tables: sessionInfo.tables,
                participantsPerTable: sessionInfo.participantsPerTable
            }}
        />
    );
};

export default SessionManager;

// components/MainContent.js
import React from 'react';
import SessionManager from './SessionManager';

const MainContent = ({ 
    selectedTool, 
    projectName, 
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    sessionInfo
}) => {
    return (
        <main className={`flex-1 p-4 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
            <SessionManager 
                selectedTool={selectedTool}
                projectName={projectName}
                sessionInfo={sessionInfo}
            />
        </main>
    );
};

export default MainContent;

// App.js
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
        if (!sessionData || !sessionData.selectedTools || sessionData.selectedTools.length === 0) {
            console.error('Session data is invalid:', sessionData);
            return;
        }
        setSessionInfo(sessionData);
        setSelectedTool(sessionData.selectedTools[0]);
        setOpenTools([sessionData.selectedTools[0]]);
        setIsSessionStarted(true);
    };

    const handleSelectTool = (tool) => {
        if (!tool) return;
        setSelectedTool(tool);
        if (!openTools.includes(tool)) {
            setOpenTools([...openTools, tool]);
        }
    };

    const handleCloseTab = (tool) => {
        if (!tool) return;
        setOpenTools(openTools.filter(t => t !== tool));
        if (selectedTool === tool) {
            setSelectedTool(openTools[openTools.length - 2] || null);
        }
    };

    if (!isSessionStarted) {
        return <SessionConfig onStartSession={handleStartSession} />;
    }

    if (!sessionInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar 
                selectedTool={selectedTool} 
                onSelectTool={handleSelectTool} 
                tools={sessionInfo?.selectedTools || []}
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
            />
            <div className="flex flex-col flex-1">
                <Header projectName={sessionInfo?.projectName || 'Projet'} />
                <div className="flex border-b mb-4">
                    {openTools.map(tool => (
                        <div 
                            key={tool}
                            className={`px-4 py-2 cursor-pointer ${
                                tool === selectedTool ? 'bg-blue-100' : 'bg-gray-100'
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTool(tool);
                            }}
                        >
                            {tool}
                            <button 
                                className="ml-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCloseTab(tool);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <MainContent 
                    selectedTool={selectedTool}
                    projectName={sessionInfo.projectName}
                    isSidebarCollapsed={isSidebarCollapsed}
                    setIsSidebarCollapsed={setIsSidebarCollapsed}
                    sessionInfo={sessionInfo}
                />
            </div>
        </div>
    );
};

export default App;