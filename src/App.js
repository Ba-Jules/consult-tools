import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SessionConfig from './components/SessionConfig';
import ParticipantRoute from './components/routes/ParticipantRoute';

const App = () => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [sessionInfo, setSessionInfo] = useState(null);
    const [isSessionStarted, setIsSessionStarted] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleStartSession = async (sessionData) => {
        try {
            const formattedSessionData = {
                sessionId: `session-${Date.now()}`,
                projectName: sessionData.projectName,
                selectedTools: sessionData.selectedTools,
                totalParticipants: Math.max(0, parseInt(sessionData.totalParticipants) || 0),
                participantsExpected: Math.max(0, parseInt(sessionData.participantsExpected) || 0),
                tables: Math.max(1, parseInt(sessionData.tables) || 1),
                duration: {
                    hours: Math.max(0, parseInt(sessionData.duration?.hours) || 0),
                    minutes: Math.max(0, parseInt(sessionData.duration?.minutes) || 0)
                },
                remainingTime: Math.max(0, parseInt(sessionData.remainingTime) || 60),
                participants: []
            };

            const response = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedSessionData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la session');
            }

            const createdSession = await response.json();
            setSessionInfo(createdSession);
            setSelectedTool(sessionData.selectedTools[0]);
            setIsSessionStarted(true);
        } catch (error) {
            console.error('Erreur création session:', error);
            alert('Erreur lors de la création de la session');
        }
    };

    return (
        <BrowserRouter>
            <Routes>
    {/* Route participant */}
    <Route
        path="/participant/:sessionId/:toolId"
        element={<ParticipantRoute />}
    />
    
    {/* Route principale */}
    <Route
        path="/"
        element={
            <div className="flex h-screen bg-gray-100">
                {!isSessionStarted ? (
                    <SessionConfig onStartSession={handleStartSession} />
                ) : (
                    <>
                        <Sidebar
                            selectedTool={selectedTool}
                            tools={sessionInfo?.selectedTools || []}
                            isSidebarCollapsed={isSidebarCollapsed}
                            setIsSidebarCollapsed={setIsSidebarCollapsed}
                            onSelectTool={setSelectedTool}
                        />
                        <div className="flex flex-col flex-1">
                            <Header projectName={sessionInfo?.projectName || 'Projet'} />
                            <MainContent
                                selectedTool={selectedTool}
                                projectName={sessionInfo?.projectName}
                                sessionInfo={sessionInfo}
                                isSidebarCollapsed={isSidebarCollapsed}
                                setIsSidebarCollapsed={setIsSidebarCollapsed}
                            />
                        </div>
                    </>
                )}
            </div>
        }
    />
    </Routes>
        </BrowserRouter>
    );
};

export default App;