import React, { useState } from 'react';
import SessionManager from './SessionManager';
import ParticipantAccess from './Participant/ParticipantAccess';
import { X, Minimize, Users } from 'lucide-react';

const TablesView = ({ totalParticipants, tables }) => {
    const participantsPerTable = Math.ceil(totalParticipants / tables);
    
    return (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Disposition des tables</h3>
            <div className="space-y-4">
                {Array.from({ length: tables }, (_, tableIndex) => {
                    const tableParticipants = Math.min(
                        participantsPerTable,
                        totalParticipants - (tableIndex * participantsPerTable)
                    );
                    
                    return (
                        <div key={tableIndex} className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="text-sm font-medium mb-2">Table {tableIndex + 1}</div>
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: tableParticipants }, (_, participantIndex) => (
                                    <div
                                        key={participantIndex}
                                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm"
                                    >
                                        {participantIndex + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const MainContent = ({ 
    selectedTool, 
    projectName, 
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    sessionInfo
}) => {
    const [isParticipantAccessVisible, setIsParticipantAccessVisible] = useState(true);
    const [isParticipantAccessMinimized, setIsParticipantAccessMinimized] = useState(false);

    if (!sessionInfo) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-gray-600">
                    Erreur: Configuration de session manquante
                </div>
            </div>
        );
    }

    return (
        <main className="flex-1">
            <div className="flex h-full">
                <div className={`flex-1 p-4 transition-all duration-300 ${isParticipantAccessVisible ? 'mr-4' : ''}`}>
                    <SessionManager 
                        selectedTool={selectedTool}
                        projectName={projectName}
                        sessionInfo={sessionInfo}
                    />
                </div>

                {isParticipantAccessVisible && (
                    <div className={`w-80 bg-white shadow-xl border-l transition-all flex flex-col ${isParticipantAccessMinimized ? 'h-12' : 'h-full'}`}>
                        <div className="flex items-center justify-between p-3 bg-gray-100 border-b">
                            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>
                                    Accès participants
                                    <span className="text-xs text-gray-500 ml-2">
                                        ({sessionInfo.selectedTools.length} outils)
                                    </span>
                                </span>
                            </h2>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setIsParticipantAccessMinimized(!isParticipantAccessMinimized)}
                                    className="hover:bg-gray-200 p-1 rounded transition-colors"
                                >
                                    <Minimize className="w-4 h-4 text-gray-600" />
                                </button>
                                <button 
                                    onClick={() => setIsParticipantAccessVisible(false)}
                                    className="hover:bg-gray-200 p-1 rounded transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className={`${isParticipantAccessMinimized ? 'hidden' : 'flex flex-col flex-1 overflow-auto'}`}>
                            <TablesView 
                                totalParticipants={sessionInfo.totalParticipants} 
                                tables={sessionInfo.tables}
                            />
                            <div className="flex-1 overflow-auto">
                                <ParticipantAccess 
                                    sessionInfo={sessionInfo}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MainContent;