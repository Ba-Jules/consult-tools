import React, { useMemo } from 'react';
import ToolInterface from './ToolInterface';
import ParticipantsView from './ParticipantsView';
import { getToolConfig } from './toolsRegistry/toolRegistry';

const SessionManager = ({ 
    selectedTool,
    projectName,
    moderatorName = "Modérateur",
    sessionInfo
}) => {
    // Log pour déboggage des données reçues
    console.log("SessionManager - données reçues:", {
        selectedTool,
        projectName,
        sessionInfo
    });

    // Validation et formatage des données de session avec useMemo
    const validatedConfig = useMemo(() => {
        if (!sessionInfo) {
            console.warn("SessionManager: sessionInfo manquant");
            return null;
        }

        try {
            // Validation et formatage des données numériques
            const config = {
                // Données de base
                projectName: sessionInfo.projectName || 'Projet',
                selectedTools: sessionInfo.selectedTools || [],

                // Valeurs numériques avec validation
                totalParticipants: Math.max(0, parseInt(sessionInfo.totalParticipants) || 0),
                participantsExpected: Math.max(0, parseInt(sessionInfo.participantsExpected) || 0),
                tables: Math.max(1, parseInt(sessionInfo.tables) || 1),
                participantsPerTable: Math.max(1, parseInt(sessionInfo.participantsPerTable) || 
                    Math.ceil((parseInt(sessionInfo.participantsExpected) || 0) / 
                            (parseInt(sessionInfo.tables) || 1))),

                // Informations de durée
                duration: {
                    hours: Math.max(0, parseInt(sessionInfo.duration?.hours) || 0),
                    minutes: Math.max(0, parseInt(sessionInfo.duration?.minutes) || 0)
                },
                remainingTime: Math.max(0, parseInt(sessionInfo.remainingTime) || 60),

                // Autres informations
                participants: sessionInfo.participants || [],
                tdrFile: sessionInfo.tdrFile || null,
                charterFile: sessionInfo.charterFile || null
            };

            // Vérification des contraintes métier
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

            // Log de la configuration validée
            console.log("SessionManager - configuration validée:", config);
            return config;

        } catch (error) {
            console.error("Erreur lors de la validation de la configuration:", error);
            return null;
        }
    }, [sessionInfo]);

    // Si pas d'outil sélectionné
    if (!selectedTool) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-xl text-gray-600">
                    Sélectionnez un outil pour commencer
                </div>
            </div>
        );
    }

    // Si la configuration n'est pas valide
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

    // Tout est valide, on peut rendre l'interface
    return (
        <ToolInterface 
            toolId={selectedTool}
            projectName={projectName}
            moderatorName={moderatorName}
            sessionConfig={validatedConfig}
        />
    );
};

export default SessionManager;