import React from 'react';
import SessionManager from './SessionManager';

const MainContent = ({ 
    selectedTool, 
    projectName, 
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    sessionInfo
}) => {
    // Log pour déboggage
    console.log("MainContent - sessionInfo reçu:", sessionInfo);

    // Vérification des props nécessaires
    if (!sessionInfo) {
        console.warn("MainContent: sessionInfo manquant");
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-gray-600">
                    Erreur: Configuration de session manquante
                </div>
            </div>
        );
    }

    // Normalisation des données de session
    const normalizedSessionInfo = {
        projectName: projectName || 'Projet',
        selectedTools: sessionInfo.selectedTools || [],
        totalParticipants: parseInt(sessionInfo.totalParticipants) || 0,
        participantsExpected: parseInt(sessionInfo.participantsExpected) || 0,
        tables: parseInt(sessionInfo.tables) || 1,
        participantsPerTable: parseInt(sessionInfo.participantsPerTable) || 0,
        duration: sessionInfo.duration || { hours: 1, minutes: 0 },
        remainingTime: parseInt(sessionInfo.remainingTime) || 60,
        participants: sessionInfo.participants || [],
        tdrFile: sessionInfo.tdrFile || null,
        charterFile: sessionInfo.charterFile || null
    };

    return (
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
            <SessionManager 
                selectedTool={selectedTool}
                projectName={projectName}
                sessionInfo={normalizedSessionInfo}
            />
        </main>
    );
};

export default MainContent;