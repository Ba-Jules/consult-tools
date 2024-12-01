import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AFOMInterface from '../Participant/toolInterface/AFOMInterface';
import ArbreInterface from '../Participant/toolInterface/ArbreInterface';
import CadreLogiqueInterface from '../Participant/toolInterface/CadreLogiqueInterface';

const TOOL_INTERFACES = {
    'afom': AFOMInterface,
    'arbre-problemes': ArbreInterface,
    'cadre-logique': CadreLogiqueInterface
};

const ParticipantRoute = () => {
    const { sessionId, toolId } = useParams();
    const [sessionInfo, setSessionInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch(`/api/sessions/${sessionId}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Session introuvable');
                }
                
                setSessionInfo(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) {
            fetchSession();
        }
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (error || !sessionInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Erreur</h2>
                    <p className="text-gray-600">{error || 'Session introuvable'}</p>
                </div>
            </div>
        );
    }

    const ToolInterface = TOOL_INTERFACES[toolId];

    if (!ToolInterface) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Outil non reconnu</h2>
                    <p className="text-gray-600">L'outil demandé n'est pas disponible.</p>
                </div>
            </div>
        );
    }

    if (!sessionInfo.selectedTools.includes(toolId)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Accès non autorisé</h2>
                    <p className="text-gray-600">Cet outil n'est pas disponible pour cette session.</p>
                </div>
            </div>
        );
    }

    return <ToolInterface sessionInfo={sessionInfo} toolId={toolId} />;
};

export default ParticipantRoute;