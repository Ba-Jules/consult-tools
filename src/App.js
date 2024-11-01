import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SessionConfig from './components/SessionConfig';
import './index.css';
import { getToolConfig, isToolAvailable } from './components/toolsRegistry/toolRegistry';

const App = () => {
    // États
    const [selectedTool, setSelectedTool] = useState(null);
    const [sessionInfo, setSessionInfo] = useState(null);
    const [isSessionStarted, setIsSessionStarted] = useState(false);
    const [openTools, setOpenTools] = useState([]);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Gestionnaire de démarrage de session
    const handleStartSession = (sessionData) => {
      console.log("Session Data:", sessionData);
        if (!sessionData || !sessionData.selectedTools || sessionData.selectedTools.length === 0) {
            console.error('Session data is invalid:', sessionData);
            return;
        }

        // Configuration de la session avec les données de participants
        const sessionConfigWithParticipants = {
            ...sessionData,
            totalParticipants: sessionData.totalParticipants || sessionData.participantsExpected || 0,
            tables: sessionData.tables || 1,
            participantsPerTable: sessionData.participantsPerTable || 0
        };

        setSessionInfo(sessionConfigWithParticipants);
        setSelectedTool(sessionData.selectedTools[0]);
        setOpenTools([sessionData.selectedTools[0]]);
        setIsSessionStarted(true);
    };

    // Gestionnaire de sélection d'outil
    const handleSelectTool = (tool) => {
        if (!tool) return;
        setSelectedTool(tool);
        if (!openTools.includes(tool)) {
            setOpenTools([...openTools, tool]);
        }
    };

    // Gestionnaire de fermeture d'onglet
    const handleCloseTab = (tool) => {
        if (!tool) return;
        setOpenTools(openTools.filter(t => t !== tool));
        if (selectedTool === tool) {
            setSelectedTool(openTools[openTools.length - 2] || null);
        }
    };

    // Affichage de la configuration de session si la session n'est pas démarrée
    if (!isSessionStarted) {
        return <SessionConfig onStartSession={handleStartSession} />;
    }

    // Affichage du chargement si les informations de session ne sont pas disponibles
    if (!sessionInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-600">Chargement...</div>
            </div>
        );
    }

    // Interface principale de l'application
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Barre latérale */}
            <Sidebar 
                selectedTool={selectedTool} 
                onSelectTool={handleSelectTool} 
                tools={sessionInfo?.selectedTools || []}
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
            />
            
            {/* Conteneur principal */}
            <div className="flex flex-col flex-1">
                {/* En-tête */}
                <Header 
                    projectName={sessionInfo?.projectName || 'Projet'}
                />

                {/* Barre d'onglets */}
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

                {/* Contenu principal */}
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