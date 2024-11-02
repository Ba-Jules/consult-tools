import React, { useMemo, useState } from 'react';
import ToolInterface from './ToolInterface'; // Assurez-vous que ce composant existe

const SessionManager = ({ 
    selectedTool,
    projectName,
    moderatorName = "Modérateur",
    sessionInfo
}) => {
    console.log("SessionManager - données reçues:", {
        selectedTool,
        projectName,
        sessionInfo
    });

    // État pour gérer l'affichage entre "Présentation" et "Exploitation"
    const [mode, setMode] = useState('presentation'); // "presentation" ou "exploitation"

    // Validation et formatage des données de session avec useMemo
    const validatedConfig = useMemo(() => {
        if (!sessionInfo) {
            console.warn("SessionManager: sessionInfo manquant");
            return null;
        }

        try {
            const config = {
                projectName: sessionInfo.projectName || 'Projet',
                selectedTools: sessionInfo.selectedTools || [],
                totalParticipants: Math.max(0, parseInt(sessionInfo.totalParticipants) || 0),
                participantsExpected: Math.max(0, parseInt(sessionInfo.participantsExpected) || 0),
                tables: Math.max(1, parseInt(sessionInfo.tables) || 1),
                participantsPerTable: Math.max(1, parseInt(sessionInfo.participantsPerTable) || 
                    Math.ceil((parseInt(sessionInfo.participantsExpected) || 0) / 
                            (parseInt(sessionInfo.tables) || 1))),
                duration: {
                    hours: Math.max(0, parseInt(sessionInfo.duration?.hours) || 0),
                    minutes: Math.max(0, parseInt(sessionInfo.duration?.minutes) || 0)
                },
                remainingTime: Math.max(0, parseInt(sessionInfo.remainingTime) || 60),
                participants: sessionInfo.participants || [],
                tdrFile: sessionInfo.tdrFile || null,
                charterFile: sessionInfo.charterFile || null
            };

            if (config.participantsExpected <= 0) {
                console.warn("Nombre de participants invalide");
                return null;
            }

            if (config.tables <= 0) {
                console.warn("Nombre de tables invalide");
                return null;
            }

            if (config.participantsPerTable <= 0) {
                console.warn("Participants par table invalide");
                return null;
            }

            console.log("SessionManager - configuration validée:", config);
            return config;

        } catch (error) {
            console.error("Erreur lors de la validation de la configuration:", error);
            return null;
        }
    }, [sessionInfo]);

    if (!selectedTool) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-gray-600">
                    Sélectionnez un outil pour commencer
                </div>
            </div>
        );
    }

    if (!validatedConfig) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-lg">
                    <div className="text-xl text-gray-600 mb-4">
                        Configuration de session incomplète
                    </div>
                    <div className="text-sm text-gray-500">
                        Veuillez vérifier les paramètres suivants :
                        <ul className="list-disc mt-2 text-left inline-block">
                            {(!sessionInfo?.totalParticipants || parseInt(sessionInfo?.totalParticipants) <= 0) && 
                                <li>Nombre total de participants (doit être supérieur à 0)</li>}
                            {(!sessionInfo?.tables || parseInt(sessionInfo?.tables) <= 0) && 
                                <li>Nombre de tables (doit être supérieur à 0)</li>}
                            {(!sessionInfo?.participantsPerTable || parseInt(sessionInfo?.participantsPerTable) <= 0) && 
                                <li>Nombre de participants par table (doit être supérieur à 0)</li>}
                        </ul>
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <pre className="text-left text-xs">
                            Configuration reçue: {JSON.stringify(sessionInfo, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="session-manager">
            <div className="header">
                <h2>{`${selectedTool} - ${projectName}`}</h2>
                <span>{moderatorName} - {new Date().toLocaleDateString()}</span>
            </div>
            <div className="options">
                <button 
                    className={`btn-presentation ${mode === 'presentation' ? 'active' : ''}`}
                    onClick={() => setMode('presentation')}
                >
                    Présentation
                </button>
                <button 
                    className={`btn-exploitation ${mode === 'exploitation' ? 'active' : ''}`}
                    onClick={() => setMode('exploitation')}
                >
                    Démarrer
                </button>
            </div>
            <ToolInterface 
                toolId={selectedTool}
                projectName={projectName}
                moderatorName={moderatorName}
                sessionConfig={validatedConfig}
                mode={mode} // Passez le mode à ToolInterface si nécessaire
            />
        </div>
    );
};

export default SessionManager;