import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SessionConfig from './components/SessionConfig';
import { getToolConfig } from './components/toolsRegistry/toolRegistry';
import './index.css';

const App = () => {
    // États
    const [selectedTool, setSelectedTool] = useState(null);
    const [sessionInfo, setSessionInfo] = useState(null);
    const [isSessionStarted, setIsSessionStarted] = useState(false);
    const [openTools, setOpenTools] = useState([]);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Gestionnaire de démarrage de session
    const handleStartSession = (sessionData) => {
        if (!sessionData || !sessionData.selectedTools || sessionData.selectedTools.length === 0) {
            console.error('Session data is invalid:', sessionData);
            return;
        }

        // Formatage des données de session
        const formattedSessionData = {
            projectName: sessionData.projectName,
            selectedTools: sessionData.selectedTools,
            totalParticipants: Math.max(0, parseInt(sessionData.totalParticipants) || 0),
            participantsExpected: Math.max(0, parseInt(sessionData.participantsExpected) || 0),
            tables: Math.max(1, parseInt(sessionData.tables) || 1),
            participantsPerTable: Math.max(1, Math.ceil(
                (parseInt(sessionData.participantsExpected) || 0) / 
                (parseInt(sessionData.tables) || 1)
            )),
            duration: {
                hours: Math.max(0, parseInt(sessionData.duration?.hours) || 0),
                minutes: Math.max(0, parseInt(sessionData.duration?.minutes) || 0)
            },
            remainingTime: Math.max(0, parseInt(sessionData.remainingTime) || 60),
            participants: sessionData.participants || [],
            tdrFile: sessionData.tdrFile || null,
            charterFile: sessionData.charterFile || null
        };

        // Log pour déboggage
        console.log("Session configuration formatée:", formattedSessionData);

        // Mise à jour des états
        setSessionInfo(formattedSessionData);
        setSelectedTool(sessionData.selectedTools[0]);
        setOpenTools([sessionData.selectedTools[0]]);
        setIsSessionStarted(true);
    };

    // Gestionnaire de sélection d'outil
    const handleSelectTool = (tool) => {
        if (!tool) return;
        
        const toolId = typeof tool === 'string' ? tool : tool.id;
        setSelectedTool(toolId);
        if (!openTools.includes(toolId)) {
            setOpenTools([...openTools, toolId]);
        }
    };

    // Gestionnaire de fermeture d'onglet
    const handleCloseTab = (tool) => {
        const toolId = typeof tool === 'string' ? tool : tool.id;
        if (!toolId) return;
        
        setOpenTools(openTools.filter(t => t !== toolId));
        if (selectedTool === toolId) {
            setSelectedTool(openTools[openTools.length - 2] || null);
        }
    };

    // Affichage de la configuration initiale
    if (!isSessionStarted) {
        return <SessionConfig onStartSession={handleStartSession} />;
    }

    // Affichage du chargement
    if (!sessionInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-600">Chargement...</div>
            </div>
        );
    }

    // Affichage principal
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
                    {openTools.map(toolId => {
                        const toolConfig = getToolConfig(toolId);
                        return (
                            <div 
                                key={toolId}
                                className={`px-4 py-2 cursor-pointer ${
                                    toolId === selectedTool ? 'bg-blue-100' : 'bg-gray-100'
                                }`}
                                onClick={() => setSelectedTool(toolId)}
                            >
                                <span className="mr-2">{toolConfig?.icon || '🔧'}</span>
                                {toolConfig?.name || toolId}
                                <button 
                                    className="ml-2 hover:text-red-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCloseTab(toolId);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="flex-1 overflow-auto">
                    <MainContent 
                        selectedTool={selectedTool}
                        projectName={sessionInfo.projectName}
                        isSidebarCollapsed={isSidebarCollapsed}
                        setIsSidebarCollapsed={setIsSidebarCollapsed}
                        sessionInfo={sessionInfo}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;