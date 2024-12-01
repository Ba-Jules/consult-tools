import React, { useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, CheckCircle } from 'lucide-react';

const ParticipantAccess = ({ sessionInfo }) => {
    const [copiedTool, setCopiedTool] = useState(null);

    const getToolUrl = useCallback((toolId) => {
        if (!sessionInfo?.sessionId) return '';
        
        // En développement, toujours utiliser le port 3000 (frontend)
        // parce que c'est React Router qui gère les routes participant
        const baseUrl = window.location.protocol + '//' + window.location.hostname;
        const port = process.env.NODE_ENV === 'development' ? ':3000' : '';

        // Construire l'URL avec le chemin de l'interface participant
        return `${baseUrl}${port}/participant/${sessionInfo.sessionId}/${toolId}`;
    }, [sessionInfo]);

    const handleCopyLink = useCallback(async (toolId) => {
        try {
            const url = getToolUrl(toolId);
            await navigator.clipboard.writeText(url);
            setCopiedTool(toolId);
            setTimeout(() => setCopiedTool(null), 2000);
        } catch (err) {
            console.error('Erreur de copie:', err);
            // Fallback pour les navigateurs qui ne supportent pas l'API Clipboard
            const textArea = document.createElement('textarea');
            textArea.value = getToolUrl(toolId);
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopiedTool(toolId);
                setTimeout(() => setCopiedTool(null), 2000);
            } catch (e) {
                console.error('Erreur fallback copy:', e);
                alert('Impossible de copier le lien');
            }
            document.body.removeChild(textArea);
        }
    }, [getToolUrl]);

    const toolNames = {
        'afom': 'AFOM',
        'arbre-problemes': 'Arbre à problèmes',
        'cadre-logique': 'Cadre logique',
        'gantt': 'Diagramme de Gantt',
        'parties-prenantes': 'Analyse des parties prenantes',
        'analyse-genre': 'Analyse genre',
        'carte-mentale': 'Carte mentale',
        'analyse-multicriteres': 'Analyse multicritères'
    };

    const getToolIcon = (toolId) => {
        const icons = {
            'afom': '📊',
            'arbre-problemes': '🌳',
            'cadre-logique': '📋',
            'gantt': '📅',
            'parties-prenantes': '👥',
            'analyse-genre': '⚖️',
            'carte-mentale': '🧠',
            'analyse-multicriteres': '🎯'
        };
        return icons[toolId] || '🔧';
    };

    if (!sessionInfo?.selectedTools?.length) {
        return (
            <div className="p-4 text-gray-500 text-center">
                Aucun outil sélectionné
            </div>
        );
    }

    return (
        <div className="p-4">
            {sessionInfo.selectedTools.map(toolId => (
                <div key={toolId} className="bg-white rounded-lg shadow-sm border p-4 mb-4 transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{getToolIcon(toolId)}</span>
                        <h3 className="font-medium">
                            {toolNames[toolId] || toolId}
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-center">
                            <div className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <QRCodeSVG 
                                    value={getToolUrl(toolId)}
                                    size={128}
                                    level="M"
                                    includeMargin={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="text-sm text-gray-600 break-all bg-gray-50 p-2 rounded select-all">
                                {getToolUrl(toolId)}
                            </div>
                            <button
                                onClick={() => handleCopyLink(toolId)}
                                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md mt-2 transition-all duration-200 ${
                                    copiedTool === toolId 
                                        ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                }`}
                            >
                                {copiedTool === toolId ? (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Copié !
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copier le lien
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParticipantAccess;