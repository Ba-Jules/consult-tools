import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AFOMInterface from './Participant/toolInterface/AFOMInterface';
import ArbreInterface from './Participant/toolInterface/ArbreInterface';
import CadreLogiqueInterface from './Participant/toolInterface/CadreLogiqueInterface';

const ParticipantView = () => {
    const { sessionId, toolId } = useParams();
    const [sessionInfo, setSessionInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch(`/api/sessions/${sessionId}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error('Session non trouvée ou expirée');
                }
                setSessionInfo(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (sessionId) {
            fetchSession();
        }
    }, [sessionId]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Erreur</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    let ToolComponent;
    switch (toolId) {
        case 'afom':
            ToolComponent = AFOMInterface;
            break;
        case 'arbre-problemes':
            ToolComponent = ArbreInterface;
            break;
        case 'cadre-logique':
            ToolComponent = CadreLogiqueInterface;
            break;
        default:
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-red-600 mb-4">Outil non reconnu</h2>
                        <p className="text-gray-600">L'outil demandé n'existe pas</p>
                    </div>
                </div>
            );
    }

    return ToolComponent ? <ToolComponent sessionInfo={sessionInfo} /> : null;
};

export default ParticipantView;